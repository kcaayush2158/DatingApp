package com.application.springboot.config;

import com.application.springboot.model.userstore.ActiveUserStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import javax.sql.DataSource;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("customUserDetailsService")
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private DataSource dataSource;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**").antMatchers("/static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/assets/**").permitAll();
        http.cors();
        http.csrf().disable()
                //   .headers().frameOptions().disable().and()
                .authorizeRequests()
                .antMatchers(
                        ("/assets/**"),
                        "/static/assets/**",
                        "/img/**",
                        "/api/**",
                        "/sounds/**",
                        "/webjars/**").permitAll()
                .antMatchers("/home").hasRole("USER")
                .antMatchers("/", "/teams", "/signup", "/login", "/home", "/aboutme", "/upload", "/sounds/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/", true)
                .permitAll()
                .and()
                .logout()
                .invalidateHttpSession(true)
                // .clearAuthentication(true)
                //  .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/login?logout")
                .and()
                .rememberMe()
                .key("remember-me")
                .rememberMeParameter("remember-me");
        http.cors();
        http.exceptionHandling().accessDeniedPage("/403");
        http.sessionManagement().maximumSessions(1).sessionRegistry(sessionRegistry());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(encode());
    }

    @Bean
    public BCryptPasswordEncoder encode() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PersistentTokenRepository tokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepositoryImpl = new JdbcTokenRepositoryImpl();
        jdbcTokenRepositoryImpl.setDataSource(dataSource);
        return jdbcTokenRepositoryImpl;
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
    }

    @Bean
    public ActiveUserStore activeUserStore() {
        return new ActiveUserStore();
    }

}



