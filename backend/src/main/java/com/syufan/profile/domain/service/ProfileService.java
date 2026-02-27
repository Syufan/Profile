package com.syufan.profile.domain.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import com.syufan.profile.domain.model.About;
import com.syufan.profile.domain.model.Experience;
import com.syufan.profile.domain.model.Project;
import com.fasterxml.jackson.core.type.TypeReference;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProfileService {

    private final ObjectMapper mapper;
    private final Map<String, Object> cachedData;

    public ProfileService(ObjectMapper mapper, @Value("${data.file.path}") Resource dataFile) throws IOException{
        this.mapper = mapper;
        if (!dataFile.exists()) {
            throw new IOException("Data file not found: " + dataFile.getFilename());
        }
        this.cachedData = mapper.readValue(dataFile.getInputStream(), new TypeReference<Map<String, Object>>() {});
        log.info("Data loaded successfully from: {}", dataFile.getFilename());
    }

    private About getAbout(Map<String, Object> raw) {
        return this.mapper.convertValue(raw.get("about"), About.class);
    }

    private List<Experience> getExperience(Map<String, Object> raw) {
        return this.mapper.convertValue(raw.get("experience"),
        this.mapper.getTypeFactory().constructCollectionType(List.class, Experience.class));
    }

    private List<Project> getProjects(Map<String, Object> raw) {
        return this.mapper.convertValue(raw.get("projects"),
            this.mapper.getTypeFactory().constructCollectionType(List.class, Project.class));
    }

    public Map<String, Object> getProfile() {
        Map<String, Object> result = new HashMap<>();
        result.put("about", getAbout(cachedData));
        result.put("experience", getExperience(cachedData));
        result.put("projects", getProjects(cachedData));
        return result;
    }

    public List<Project> getProjects() {
        return getProjects(cachedData);
    }

}
