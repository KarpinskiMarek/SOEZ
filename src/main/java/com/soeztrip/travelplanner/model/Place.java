package com.soeztrip.travelplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(length = 2048)
    private String prompt;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
     */
    private String country; // type Country

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Ticket> tickets = new ArrayList<>();


    public Place(Long id, String name, Date arrive, Date leave, String prompt, String country, Trip trip, List<Ticket> transports) {
        this.id = id;
        this.name = name;
        this.arrive = arrive;
        this.leave = leave;
        this.prompt = prompt;
        this.country = country;
        this.trip = trip;
        this.tickets = new ArrayList<>();
    }
}
