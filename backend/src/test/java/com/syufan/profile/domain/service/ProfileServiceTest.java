package com.syufan.profile.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.syufan.profile.domain.model.About;
import com.syufan.profile.domain.model.Project;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProfileServiceTest {
    private ObjectMapper objectMapper;
    private ProfileService service;

    @BeforeEach
    void setUp() throws IOException {
        objectMapper = new ObjectMapper();
        service = new ProfileService(objectMapper, new ClassPathResource("data.json"));
    }

    @Test
    @DisplayName("Should load data successfully when file exists")
    void shouldLoadDataSuccessfully() {
        Resource validFile = new ClassPathResource("data.json");

        assertThatCode(() -> new ProfileService(objectMapper, validFile))
            .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("Should throw IOException when file does not exist")
    void shouldThrowIOExceptionWhenFileNotFound() throws IOException {
        Resource missingFile = mock(Resource.class);
        when(missingFile.exists()).thenReturn(false);
        when(missingFile.getFilename()).thenReturn("missing.json");

        assertThatThrownBy(() -> new ProfileService(objectMapper, missingFile))
            .isInstanceOf(IOException.class)
            .hasMessageContaining("Data file not found");
    }

    @Test
    @DisplayName("Should return profile map with all required keys")
    void getProfile_shouldContainAllRequiredKeys() throws IOException {
        Map<String, Object> result = service.getProfile();

        assertThat(result).containsKeys("about", "experience", "projects");
    }

    @Test
    @DisplayName("Should map profile values to correct types")
    void getProfile_shouldMapValuesToCorrectTypes() throws IOException {
        Map<String, Object> result = service.getProfile();

        assertThat(result.get("about")).isInstanceOf(About.class);
        assertThat(result.get("experience")).isInstanceOf(List.class);
        assertThat(result.get("projects")).isInstanceOf(List.class);
    }

    @Test
    @DisplayName("Should return non-empty list of projects")
    void getProjects_shouldReturnNonEmptyProjectList() throws IOException {
        List<Project> projects = service.getProjects();

        assertThat(projects)
            .isNotNull()
            .isNotEmpty()
            .allSatisfy(p -> assertThat(p).isInstanceOf(Project.class));
    }
}
