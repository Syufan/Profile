package com.syufan.profile.domain.model;

import java.util.List;
import lombok.Data;

@Data
public class About {
    private String name;
    private String title;
    private String tagline;
    private List<String> paragraphs;
}
