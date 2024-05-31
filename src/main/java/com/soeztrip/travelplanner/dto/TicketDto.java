package com.soeztrip.travelplanner.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TransportDto {

    private Long id;
    private String ticket;
    private String fromDate;
    private String toDate;
}
