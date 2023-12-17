package com.soeztrip.travelplanner.dto;


import com.soeztrip.travelplanner.model.Place;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class TripDto {

    private Long id;
    private Date startingDate;
    private Date endingDate;
    private Boolean finished;
    private String title;
    private List<Place> places;
}
