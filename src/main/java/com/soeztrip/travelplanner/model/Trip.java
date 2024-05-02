package com.soeztrip.travelplanner.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
//@AllArgsConstructor
@Builder
@Entity
@Table(name = "trips")
//@JsonIgnoreProperties("userTrips")
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


    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Place> places= new ArrayList<>();


//    public void addUser(UserEntity user){
//        this.userEntities.add(user);
//        user.getTrips().add(this);
//    }
//    public void removeUser(Long id){
//        UserEntity user=this.userEntities.stream().filter(u->u.getId()==id).findFirst().orElse(null);
//        if( user!=null){
//            this.userEntities.remove(user);
//            user.getTrips().remove(this);
//        }
//    }

    public Trip(Long id, Date startingDate, Date endingDate, Boolean finished, String title, List<UserTrip> userTrips, List<Place> places) {
        this.id = id;
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.finished = finished;
        this.title = title;
        this.userTrips = userTrips;
        this.places = new ArrayList<>();
    }
}
