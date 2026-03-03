package com.syufan.profile.web.filter;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

class RateLimitFilterTest {

    private RateLimitFilter filter;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private FilterChain chain;

    @BeforeEach
    void setUp() throws IOException {
        filter = new RateLimitFilter();
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        chain = mock(FilterChain.class);

        PrintWriter writer = mock(PrintWriter.class);
        doReturn(writer).when(response).getWriter();
    }

    @Test
    void shouldReturnPass() throws Exception{
        when(request.getRemoteAddr()).thenReturn("192.168.1.1");

        filter.doFilter(request, response, chain);

        verify(chain).doFilter(request, response);
    }

    @Test
    void shouldReturnBlock() throws Exception{
        when(request.getRemoteAddr()).thenReturn("192.168.1.1");

        for (int i=0; i<11; i++) {
            filter.doFilter(request, response, chain);
        }

        verify(chain, times(10)).doFilter(request, response);
        verify(response).setStatus(429);
    }
}
