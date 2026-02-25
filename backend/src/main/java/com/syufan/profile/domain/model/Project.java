package com.syufan.profile.domain.model;

import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class Project {
    private String name;
    private String year;
    private String description;
    private List<String> techStack;
    private Map<String, String> url;
}
