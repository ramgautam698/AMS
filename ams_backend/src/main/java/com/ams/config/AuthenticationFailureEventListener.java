package com.ams.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.stereotype.Component;

import com.ams.utils.LoginUtils;

@Component
public class AuthenticationFailureEventListener implements ApplicationListener<AbstractAuthenticationFailureEvent>
{
	private static final Logger log = LoggerFactory.getLogger(AuthenticationFailureEventListener.class);
	
	@Override
	public void onApplicationEvent(AbstractAuthenticationFailureEvent event)
	{
		String username = event.getAuthentication().getName();
		log.info("Failed authentication for " + username + " due to " + event.getException().getMessage());
		LoginUtils.removeLoggedInUser(Integer.valueOf(username));
	}
}
