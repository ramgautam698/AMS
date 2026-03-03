package com.ams.config;

import java.util.List;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
	@Autowired
	private CustomLogoutHandler customLogoutHandler;

	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception
	{
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF for simplicity, you might want to enable it in production
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/ams/security/**",
                                "/ams/users/register"
                        ).permitAll()
                        .requestMatchers("/ams/super-admin/**").hasRole("SUPER_ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/ams/security/user-login")
                        .defaultSuccessUrl("/ams/security/users", true)
                        .failureUrl("/ams/security/user-login")
                        .permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter1(), UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                		.addLogoutHandler(customLogoutHandler)
                        .logoutUrl("/ams/security/logout")
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/ams/security/expired-session")
                        .permitAll()
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        ;
        return http.build();
    }
	
	@Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter1()
    {
    	return new JwtAuthenticationFilter();
    }
	
	@Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, 
    		BCryptPasswordEncoder passwordEncoder, 
            UserDetailsService userDetailsService) throws Exception
	{
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
//        config.addAllowedOriginPattern("*"); // Allow all origins, you can restrict it as needed
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:3000"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Access-Control-Allow-Origin"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/ams/**", config);
        
        return source;
    }
    
    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> webServerFactoryCustomizer()
    {
        return factory -> factory.addAdditionalTomcatConnectors(createHttpConnector());
    }

    private Connector createHttpConnector()
    {
        Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
        connector.setScheme("https");
        connector.setPort(8081); // this port have https here
        connector.setSecure(false);
        connector.setRedirectPort(8443); // Redirect to HTTPS port
        return connector;
    }
    
    @Bean
    public ObjectMapper objectMapper()
    {
        ObjectMapper mapper = new ObjectMapper();
        // Register JavaTimeModule to handle ZonedDateTime serialization
        mapper.registerModule(new JavaTimeModule());
        // Configure to write dates in ISO 8601 format (optional, but useful)
        mapper.findAndRegisterModules();
        return mapper;
    }
}
