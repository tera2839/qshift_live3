package com.quickshift.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;

public class CustomSecurityContextRepository implements SecurityContextRepository {

    private static final String SECURITY_CONTEXT_KEY = "SPRING_SECURITY_CONTEXT";

    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        // HttpRequestResponseHolderからリクエストを取得
        HttpServletRequest request = requestResponseHolder.getRequest();
        
        // リクエストからセキュリティコンテキストを読み込む
        SecurityContext context = (SecurityContext) request.getSession().getAttribute(SECURITY_CONTEXT_KEY);

        if (context == null) {
            context = SecurityContextHolder.createEmptyContext(); // 新規作成
        }

        return context;
    }

    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
        // セキュリティコンテキストをセッションに保存
        if (context != null) {
            request.getSession().setAttribute(SECURITY_CONTEXT_KEY, context);
        }
    }

    @Override
    public boolean containsContext(HttpServletRequest request) {
        // セッションにセキュリティコンテキストが存在するか確認
        return request.getSession().getAttribute(SECURITY_CONTEXT_KEY) != null;
    }

    public void removeContext(HttpServletRequest request, HttpServletResponse response) {
        // セッションからセキュリティコンテキストを削除
        request.getSession().removeAttribute(SECURITY_CONTEXT_KEY);
    }
}
