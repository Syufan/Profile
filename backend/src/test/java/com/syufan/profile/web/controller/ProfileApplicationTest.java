package com.syufan.profile.web.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.syufan.profile.domain.service.ProfileService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ProfileController.class)
class ProfileApplicationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @Test
    void shouldReturn200WhenGetProfile() throws Exception{
        mockMvc.perform(get("/api/"))
            .andExpect(status().isOk());
    }

    @Test
    void shouldReturn200WhenGetProject() throws Exception{
        mockMvc.perform(get("/api/projects"))
            .andExpect(status().isOk());
    }

}
