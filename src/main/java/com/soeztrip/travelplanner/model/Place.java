package com.soeztrip.travelplanner.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Date arrive;

    private Date leave;

    private String ticket;

    @Column(length = 2048)
    private String prompt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "transport_id", referencedColumnName = "id")
    private Transport transport;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();

    public Place(Long id, String name, Date arrive, Date leave, String ticket, String prompt, Country country, Trip trip, Transport transport, List<Activity> activities) {
        this.id = id;
        this.name = name;
        this.arrive = arrive;
        this.leave = leave;
        this.ticket = ticket;
        this.prompt = prompt;
        this.country = country;
        this.trip = trip;
        this.transport = transport;
        this.activities = activities;
    }
}
