package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.dto.TripParticipantDTO;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.model.UserTrip;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.TripRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.repository.UserTripRepository;
import com.soeztrip.travelplanner.service.OpenAIService;
import com.soeztrip.travelplanner.service.PlaceService;
import com.soeztrip.travelplanner.service.TripService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class TripController {

    private TripService tripService;
    private UserRepository userRepository;
    private PlaceService placeService;
    private PlaceRepository placeRepository;
    private OpenAIService openAIService;
    private UserTripRepository userTripRepository;
    private TripRepository tripRepository;

    public TripController(TripService tripService,
                          UserRepository userRepository,
                          PlaceService placeService,
                          PlaceRepository placeRepository,
                          OpenAIService openAIService,
                          UserTripRepository userTripRepository,
                          TripRepository tripRepository) {
        this.tripService = tripService;
        this.userRepository = userRepository;
        this.placeService = placeService;
        this.placeRepository = placeRepository;
        this.openAIService = openAIService;
        this.userTripRepository = userTripRepository;
        this.tripRepository=tripRepository;
    }


    @PostMapping("/trips/places/{id}/new")
    //prompt.setContent(openAIService.processResponse(placedto.getName())); //to do replaced later
    public ResponseEntity<?> addPlace(@PathVariable Long id, @RequestBody PlaceDto placedto) {
        Trip trip = tripService.mapToTrip(tripService.findTrip(id));
        Place place = placeService.mapToPlace(placedto);
        place.setTrip(trip);
        placeRepository.save(place);
        trip.getPlaces().add(place);
        tripService.saveTrip(trip);

        return ResponseEntity.created(URI.create("/" + place.getId())).body(place);
    }

    @PostMapping("/trips/new")
    public ResponseEntity<?> createTrip(@RequestBody @Valid TripDto tripDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();

        Trip trip = this.tripService.mapToTrip(tripDto);

        UserTrip userTrip = new UserTrip();
        userTrip.setUser(user);
        userTrip.setTrip(trip);
        tripService.saveTrip(trip);
        userTripRepository.save(userTrip);

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
        tripService.updateTrip(id, tripDto);
        return ResponseEntity.status(HttpStatus.OK).body("trip successfully updated");
    }

    @PutMapping("/trips/{id}/addPerson")
    public ResponseEntity<?> addPerson(@PathVariable Long id, @RequestBody TripParticipantDTO dto) {

        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        try {
            tripService.addParticipant(id, dto.getEmail());
            return ResponseEntity.ok("User added to trip successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/trips/{id}/removePerson")
    public ResponseEntity<?> removePerson(@PathVariable Long id, @RequestBody TripParticipantDTO dto) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        try {
            tripService.removeParticipant(id, dto.getEmail());
            return ResponseEntity.ok("User removed from trip successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/trips")
    public ResponseEntity<List<TripDto>> listTrips() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<TripDto> tripDtos = tripService.findAllTrips(authentication.getName());
        return ResponseEntity.ok(tripDtos);
    }

    @GetMapping("/trips/{id}")
    public ResponseEntity<?> listTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        return ResponseEntity.ok(tripService.findTrip(id));
    }
}
