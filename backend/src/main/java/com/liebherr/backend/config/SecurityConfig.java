package com.liebherr.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling(exception -> exception.authenticationEntryPoint(userAuthenticationEntryPoint))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                        //.requestMatchers(HttpMethod.GET, "/machine-cards/**").permitAll()
                        //.requestMatchers(HttpMethod.POST, "/machine-cards/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/machine-cards/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/machine-cards/**").authenticated()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
