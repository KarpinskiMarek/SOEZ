package com.soeztrip.travelplanner;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("openai")
public record OpenAIConfigProperties( String apiKey) {
}
