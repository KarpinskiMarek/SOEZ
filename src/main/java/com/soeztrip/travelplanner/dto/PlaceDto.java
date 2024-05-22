package com.soeztrip.travelplanner.dto;

import com.soeztrip.travelplanner.model.Country;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDto {

    private Long id;
    private String name;
    private Date arrive;
    private Date leave;
    private String ticket;
    private String country;

}
