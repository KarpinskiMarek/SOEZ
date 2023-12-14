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
@Table(name = "places")
public class Place {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String Name;

private Date Arrive;

private Date Leave;

private String Ticket;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @OneToOne
    @JoinColumn(name = "transport_id")
    private Transport transport;


    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Activity> activities;


}
