package com.soeztrip.travelplanner.dto;


import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TripDto {

    private Long id;
    private Date startingDate;
    private Date endingDate;
    private String startingPoint;
    private String destinationPoint;
    private Boolean finished;
    private String title;
}
