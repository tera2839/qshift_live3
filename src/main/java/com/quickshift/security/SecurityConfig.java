package com.quickshift.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import com.quickshift.service.AdminDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final String[] DEFAULT_URL = {"/", "/createAccount", "/confirmCreateAccount", "/resultCreateAccount", "/completeCreateAccount", "/completeLogin","/static/**","/css/**", "/js/**", "/img/**",
    		"/memberLogin","/completeMemberLogin","/memberSelectName","/memberHome","/memberEditHome","/memberEdit","/checkHome","/checkShift"};
    
    
    private final AdminDetailsService adminDetailsService;

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        	.csrf(csrf -> csrf 
        			.ignoringRequestMatchers("/h2-console/**")//h2-console使うためにh2だけcsrf無効化
        			)
            .rememberMe(remember -> remember
                .key("uniqueAndSecret")  // remember-me トークンを管理するためのキー
                .tokenValiditySeconds(1209600) // トークンの有効期限（2週間）
            		)
            .headers(headers -> headers.disable())//h2-console使うための無効化
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(DEFAULT_URL).permitAll()  // 特定のURLを公開
                .anyRequest().authenticated()  // 他のリクエストは認証を要求
            		)
            .sessionManagement(session -> session
            		.invalidSessionUrl("/")// セッションが無効になった場合のURL
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // セッションの作成を制御
                    .maximumSessions(Integer.MAX_VALUE)  // 同時セッション数の制限
                    .expiredUrl("/l?expired")
            		)
            .securityContext((securityContext) -> securityContext
                    .securityContextRepository(new HttpSessionSecurityContextRepository()) // セキュリティコンテキストをHTTPセッションに保存
            		)
            .formLogin(form -> form
                .loginPage("/")  // 自分で作成したログインページのURL
                .usernameParameter("mail")  // フォーム内のユーザー名パラメータ
                .passwordParameter("pass")  // フォーム内のパスワードパラメータ
                .defaultSuccessUrl("/selectStore", true)  // ログイン成功後のリダイレクト先
                .failureUrl("/?error=true")  // ログイン失敗時のリダイレクト先
                .permitAll()  // ログインページに誰でもアクセスできるように設定
            		);
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = 
            http.getSharedObject(AuthenticationManagerBuilder.class);
        
        // AdminDetailsService を使った認証設定
        authenticationManagerBuilder.userDetailsService(adminDetailsService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
}
