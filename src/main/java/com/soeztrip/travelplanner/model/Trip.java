package com.soeztrip.travelplanner.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@Builder
@Entity
@Table(name = "trips")
@DynamicUpdate
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date startingDate;
    private Date endingDate;
    private Boolean finished;
    private String title;


    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserTrip> userTrips = new ArrayList<>();


    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Place> places = new ArrayList<>();

    public Trip(Long id,
                Date startingDate,
                Date endingDate,
                Boolean finished,
                String title,
                List<UserTrip> userTrips,
                List<Place> places) {
        this.id = id;
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.finished = finished;
        this.title = title;
        this.userTrips = new ArrayList<>();
        this.places = new ArrayList<>();
    }
    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", startingDate=" + startingDate +
                ", endingDate=" + endingDate +
                ", finished=" + finished +
                ", title='" + title + '\'' +
                '}';
    }
}
