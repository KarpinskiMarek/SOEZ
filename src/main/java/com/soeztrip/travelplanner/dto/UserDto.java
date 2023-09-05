package com.soeztrip.travelplanner.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
