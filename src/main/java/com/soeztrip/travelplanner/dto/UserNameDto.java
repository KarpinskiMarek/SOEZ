package com.soeztrip.travelplanner.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserNameDto {
    private String firstName;
    private String lastName;
}
