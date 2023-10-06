package com.soeztrip.travelplanner.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date startingDate;
    private Date endingDate;
    private String startingPoint;
    private String destinationPoint;
    private Boolean finished;
    private String title;


    @ManyToMany(mappedBy = "trips")
    private List<UserEntity> userEntities;

}
