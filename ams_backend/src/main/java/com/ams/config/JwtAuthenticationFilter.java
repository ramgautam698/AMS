package com.ams.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ams.model.Users;
import com.ams.utils.LoginUtils;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
	@Autowired
	private JwtUtil jwtUtil;

	public String resolveToken(HttpServletRequest req)
    {
        String bearerToken = req.getHeader("Authorization");
        if(bearerToken == null)
        	bearerToken = req.getHeader("authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer"))
        {
            return bearerToken.substring(7);
        }
        return "";
    }
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException
	{
		String requestURI = request.getRequestURI();

		String[] excludedPaths = {
				"/ams/security/user-login",
				"/ams/security/expired-session",
				"/ams/security/login",
				"/ams/users/register"
        };
		
		for (String path : excludedPaths)
		{
			if (requestURI.startsWith(path))
			{
	        	filterChain.doFilter(request, response);
				return;
			}
		}
		
		Integer userId;
		Users user = null;

		String bearerToken = resolveToken(request);
		try
		{
			userId = jwtUtil.extractUsername(bearerToken);
			user = LoginUtils.getLoggedInUser(userId);
		}
		catch(ExpiredJwtException | NullPointerException e)
		{
			response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Session Expired! Please, login in again.\", \"exception\" :\""
            		+ e.getLocalizedMessage() + "\"}");
            response.getWriter().flush();
        	return;
		}
		catch(IllegalArgumentException e)
		{
			response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"OOPS! Seems like you are not logged in.\", \"exception\" :\""
            		+ e.getLocalizedMessage() + "\"}");
            response.getWriter().flush();
        	return;
		}
		
		UserDetails userDetails = User.withUsername(user.getId().toString())
				.password(user.getPassword())
				.roles(user.getRoleType().toString())
				.build();
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
	}
}
