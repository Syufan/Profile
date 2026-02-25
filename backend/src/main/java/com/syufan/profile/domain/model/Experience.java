package com.syufan.profile.domain.model;

import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class Experience {
    private String period;
    private String company;
    private String role;
    private Map<String, String> url;
    private List<String> bullets;
    private List<String> techStack;
}
