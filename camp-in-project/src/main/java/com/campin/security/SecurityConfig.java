package com.campin.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ConditionalOnWebApplication
public class SecurityConfig {

    private final JwtConverter jwtConverter;
    public SecurityConfig(JwtConverter jwtConverter){this.jwtConverter = jwtConverter;}

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception{

        http.csrf().disable();
        http.cors();

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/refresh-token").authenticated()
                .antMatchers(HttpMethod.POST, "/api/register").permitAll()
                .antMatchers(HttpMethod.GET, "/api/favorite", "/api/favorite/*", "/api/favorite/*/*").authenticated()
                .antMatchers(HttpMethod.POST, "/api/favorite").authenticated()
                .antMatchers(HttpMethod.DELETE, "/api/favorite/*").authenticated()
                .antMatchers(HttpMethod.GET, "/api/review", "/api/review/*", "/api/review//location/*").permitAll()
                .antMatchers(HttpMethod.GET, "/api/review/user/*").authenticated()
                .antMatchers(HttpMethod.POST, "/api/review", "/api/review/upload").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/review/*").authenticated()
                .antMatchers(HttpMethod.DELETE, "/api/review/*").authenticated()
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), jwtConverter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
        return authConfig.getAuthenticationManager();
    }
}
