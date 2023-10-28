package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Controller
public class TripController {

    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping("/trips/new")
    public ResponseEntity<?> createTrip(@RequestBody @Valid TripDto tripDto) {
        Trip result = tripService.saveTrip(tripDto);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @GetMapping("/trips/{id}/delete")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        tripService.deleteTrip(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/trips/{id}/edit")
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
