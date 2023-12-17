package com.soeztrip.travelplanner.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
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
    private Boolean finished;
    private String title;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_trip",
            joinColumns = @JoinColumn(name = "trip_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<UserEntity> userEntities= new ArrayList<>();


    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Place> places= new ArrayList<>();


    public void addUser(UserEntity user){
        this.userEntities.add(user);
        user.getTrips().add(this);
    }
    public void removeUser(Long id){
        UserEntity user=this.userEntities.stream().filter(u->u.getId()==id).findFirst().orElse(null);
        if( user!=null){
            this.userEntities.remove(user);
            user.getTrips().remove(this);
        }
    }
}
