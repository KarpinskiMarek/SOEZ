package com.soeztrip.travelplanner.dto;

import com.soeztrip.travelplanner.model.Country;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDto {

    private Long id;
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date arrive;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date leave;
    private String ticket;
    private String country;
    private MultipartFile ticketFile;

}
