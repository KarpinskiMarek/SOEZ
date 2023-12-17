package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.service.PlaceService;
import com.soeztrip.travelplanner.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin("http://localhost:3000/")
public class TripController {

    private TripService tripService;
    private UserRepository userRepository;
    private PlaceService placeService;
    private PlaceRepository placeRepository;

    public TripController(TripService tripService, UserRepository userRepository, PlaceService placeService, PlaceRepository placeRepository) {
        this.tripService = tripService;
        this.userRepository = userRepository;
        this.placeService = placeService;
        this.placeRepository = placeRepository;
    }

    @PostMapping("/trips/places/{id}/new")
    public ResponseEntity<?> addPlace(@PathVariable Long id, @RequestBody PlaceDto placedto) {
        Trip trip = tripService.mapToTrip(tripService.findTrip(id));
        Place place = placeService.mapToPlace(placedto);
        place.setTrip(trip);
        placeRepository.save(place);
        return ResponseEntity.created(URI.create("/" + place.getId())).body(place);
    }

    @PostMapping("/trips/new")
    public ResponseEntity<?> createTrip(@RequestBody @Valid TripDto tripDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        Trip trip = this.tripService.mapToTrip(tripDto);
        List<UserEntity> userList = new ArrayList<>();
        userList.add(user);
        trip.setUserEntities(userList);
        tripService.saveTrip(trip);
        return ResponseEntity.created(URI.create("/" + trip.getId())).body(trip);
    }

    @DeleteMapping("/trips/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        tripService.deleteTrip(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/trips/{id}")
    public ResponseEntity<?> editTrip(@PathVariable Long id,
                                      @Valid @RequestBody TripDto tripDto,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("data has errors");
        }
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        tripDto.setId(id);
        tripService.updateTrip(tripDto);
        return ResponseEntity.created(URI.create("/" + tripDto.getId())).body(tripDto);
    }

    @GetMapping("/trips")
    public ResponseEntity<?> listTrips() {
        return ResponseEntity.ok(tripService.findAllTrips());
    }

    @GetMapping("/trips/{id}")
    public ResponseEntity<?> listTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        return ResponseEntity.ok(tripService.findTrip(id));
    }
}
