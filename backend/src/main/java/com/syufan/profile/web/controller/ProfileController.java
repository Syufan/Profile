package com.syufan.profile.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syufan.profile.domain.service.ProfileService;
import com.syufan.profile.domain.model.Project;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/")
    public Map<String, Object> getProfile() throws Exception {
        return profileService.getProfile();
    }

    @GetMapping("/projects")
    public List<Project> getProjects() throws Exception {
        return profileService.getProjects();
    }
}
