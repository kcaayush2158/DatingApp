package com.application.springboot.service.handlers;

import com.application.springboot.model.userstore.ActiveUserStore;
import com.application.springboot.service.handlers.LoggedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class LoginAndLogoutSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    ActiveUserStore activeUserStore;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        HttpSession httpSession = request.getSession(false);
        if(httpSession != null){
            LoggedUser loggedUser= new LoggedUser(authentication.getName(),activeUserStore);
            httpSession.setAttribute("user",loggedUser);
        }

    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {

    }

}
