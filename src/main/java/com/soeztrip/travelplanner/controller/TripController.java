package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.dto.TripParticipantDTO;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.TripRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.repository.UserTripRepository;
import com.soeztrip.travelplanner.service.OpenAIService;
import com.soeztrip.travelplanner.service.PlaceService;
import com.soeztrip.travelplanner.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class TripController {

    private TripService tripService;
    private UserRepository userRepository;
    private PlaceService placeService;

    public TripController(TripService tripService,
                          UserRepository userRepository,
                          PlaceService placeService) {
        this.tripService = tripService;
        this.userRepository = userRepository;
        this.placeService = placeService;
    }


    @PostMapping("/trips/places/{id}/new")
    public ResponseEntity<?> addPlace(@PathVariable Long id, @RequestBody PlaceDto placedto) {
        placeService.addNewPlace(id, placedto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Trip has been updated successfully");
    }

    @PostMapping("/trips/new")
    public ResponseEntity<?> createTrip(@RequestBody @Valid TripDto tripDto) {
        tripService.saveTrip(tripDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Trip has been successfully created");
    }

    @DeleteMapping("/trips/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        tripService.deleteTrip(id);
        return ResponseEntity.ok().body("Trip has been deleted");
    }

    @DeleteMapping("/trips/{idTrip}/places/delete/{idPlace}")
    public ResponseEntity<?> deletePlace(@PathVariable Long idTrip, @PathVariable Long idPlace) {
        if (!tripService.tripExists(idTrip)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!placeService.placeExists(idPlace)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Place not found");
        }
        try {
            placeService.deletePlace(idPlace);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body("Place has been deleted successfully");
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
        return ResponseEntity.ok().body("Trip has been updated successfully");
    }

    @GetMapping("/places/{idPlace}")
    public ResponseEntity<?> getPlace(@PathVariable Long idPlace) {
        if(!placeService.placeExists(idPlace)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Place not found");
        }
        return ResponseEntity.ok(placeService.getPlace(idPlace));
    }

    @PutMapping("/trips/{idTrip}/places/{idPlace}")
    public ResponseEntity<?> editPlace(@PathVariable Long idTrip,
                                       @PathVariable Long idPlace,
                                       @RequestBody PlaceDto dto) {
        if (!tripService.tripExists(idTrip)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!placeService.placeExists(idPlace)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Place not found");
        }
        placeService.updatePlace(idPlace, dto);
        return ResponseEntity.ok().body("Place has been updated successfully");
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
            return ResponseEntity.ok("User has been added to the trip successfully.");
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
            return ResponseEntity.ok("User has been removed from the trip successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/trips")
    public ResponseEntity<List<TripDto>> listTrips() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<TripDto> tripDto = tripService.findAllTrips(authentication.getName());
        return ResponseEntity.ok(tripDto);
    }

    @GetMapping("/trips/{id}")
    public ResponseEntity<?> listTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        return ResponseEntity.ok(tripService.findTrip(id));
    }
}
