package com.syufan.profile.exception;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(GlobalExceptionHandler.class)
class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @RestController
    static class FakeController {
        @GetMapping("/test-error")
        public void throwException() {
            throw new RuntimeException("unexpected error");
        }
    }

    @Test
    void shouldReturn500WhenExceptionThrown() throws Exception{
        mockMvc.perform(get("/test-error"))
            .andExpect(status().isInternalServerError())
            .andExpect(jsonPath("$.error").value("Internal server error"));
    }
}
