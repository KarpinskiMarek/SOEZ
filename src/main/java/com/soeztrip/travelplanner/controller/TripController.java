package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.net.URI;

@Controller
public class TripController {

    private TripService tripService;

    public TripController(TripService tripService){
        this.tripService=tripService;
    }

    @GetMapping("/trips")
    public ResponseEntity<?> listTrips(Model model){
        return ResponseEntity.ok(tripService.findAllTrips());
    }
    @GetMapping("/trips/{id}")
    public ResponseEntity<?> listTrip(@PathVariable Long id){
        if(!tripService.tripExists(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        return ResponseEntity.ok(tripService.findTrip(id));
    }
    @PostMapping("/trips/new")
    public ResponseEntity<?>createTrip(Trip trip){
        Trip result=tripService.saveTrip(trip);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(result);
    }
}
