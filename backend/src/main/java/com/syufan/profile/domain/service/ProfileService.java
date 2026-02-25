package com.syufan.profile.domain.service;

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

@Service
public class ProfileService {

    private final Resource dataFile;
    private final ObjectMapper mapper;

    public ProfileService(ObjectMapper mapper, @Value("classpath:data.json") Resource dataFile) {
        this.mapper = mapper;
        this.dataFile = dataFile;
    }

    private Map<String, Object> loadData() throws Exception{
        return this.mapper.readValue(dataFile.getInputStream(), Map.class);
    }

    private About getAbout(Map<String, Object> raw) throws Exception {
        return this.mapper.convertValue(raw.get("about"), About.class);
    }

    private List<Experience> getExperience(Map<String, Object> raw) throws Exception {
        return this.mapper.convertValue(raw.get("experience"),
        this.mapper.getTypeFactory().constructCollectionType(List.class, Experience.class));
    }

    private List<Project> getProjects(Map<String, Object> raw) throws Exception {
        return this.mapper.convertValue(raw.get("projects"),
            this.mapper.getTypeFactory().constructCollectionType(List.class, Project.class));
    }

    public Map<String, Object> getProfile() throws Exception {
        Map<String, Object> raw = loadData();
        Map<String, Object> result = new HashMap<>();
        result.put("about", getAbout(raw));
        result.put("experience", getExperience(raw));
        result.put("projects", getProjects(raw));
        return result;
    }

}
