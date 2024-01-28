package com.soeztrip.travelplanner.dto;

import com.soeztrip.travelplanner.model.Country;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class PlaceDto {

    private Long id;
    private String name;
    private Date arrive;
    private Date leave;
    private String ticket;
    private Country country;
}
