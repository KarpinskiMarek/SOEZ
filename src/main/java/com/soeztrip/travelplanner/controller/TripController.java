package com.soeztrip.travelplanner.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.dto.TripParticipantDTO;
import com.soeztrip.travelplanner.dto.WeatherDTO;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.model.UserTrip;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.repository.UserTripRepository;
import com.soeztrip.travelplanner.service.OpenAIService;
import com.soeztrip.travelplanner.service.PlaceService;
import com.soeztrip.travelplanner.service.TripService;
import com.soeztrip.travelplanner.service.WeatherService;
import jakarta.validation.Valid;
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

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class TripController {

    private TripService tripService;
    private UserRepository userRepository;
    private PlaceService placeService;
    private PlaceRepository placeRepository;
    private OpenAIService openAIService;
    private UserTripRepository userTripRepository;
    private WeatherService weatherService;

    public TripController(TripService tripService,
                          UserRepository userRepository,
                          PlaceService placeService,
                          PlaceRepository placeRepository,
                          OpenAIService openAIService,
                          UserTripRepository userTripRepository,
                          WeatherService weatherService) {
        this.tripService = tripService;
        this.userRepository = userRepository;
        this.placeService = placeService;
        this.placeRepository = placeRepository;
        this.openAIService = openAIService;
        this.userTripRepository = userTripRepository;
        this.weatherService=weatherService;
    }


    @PostMapping("/trips/places/{id}/new")
    //prompt.setContent(openAIService.processResponse(placedto.getName())); //to do replaced later
    public ResponseEntity<?> addPlace(@PathVariable Long id, @RequestBody PlaceDto placedto) {
        Trip trip = tripService.mapToTrip(tripService.findTrip(id));
        Place place = placeService.mapToPlace(placedto);
        place.setTrip(trip);

        placeRepository.save(place);
//        if (trip.getPlaces() == null) {
//            trip.setPlaces(new ArrayList<>());
//        }
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
        return ResponseEntity.created(URI.create("/" + tripDto.getId())).body(tripDto);
    }

    @PutMapping("/trips/{id}/addPerson")
    public ResponseEntity<?> addPerson(@PathVariable Long id, @RequestBody TripParticipantDTO dto) {

        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (!userTripRepository.existsByIdAndUser(id, userRepository.findByEmail(dto.getEmail()).orElseThrow())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User is already taking part in the trip");
        }

        this.tripService.addParticipant(id, dto.getEmail());
        return ResponseEntity.created(URI.create("/")).body(tripService.findTrip(id));
    }

    @PutMapping("/trips/{id}/removePerson")
    public ResponseEntity<?> removePerson(@PathVariable Long id, @RequestBody TripParticipantDTO dto) {
        if (!tripService.tripExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip not found");
        }
        if (!userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (!userTripRepository.existsByIdAndUser(id, userRepository.findByEmail(dto.getEmail()).orElseThrow())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User is not taking part in the trip");
        }
        this.tripService.removeParticipant(id, dto.getEmail());
        return ResponseEntity.created(URI.create("/")).body(tripService.findTrip(id));

    }

    @PutMapping("/trips/{id}/updateBasic")
    public ResponseEntity<?> updateBasic(@PathVariable Long id, @RequestBody TripDto tripDto) {
        this.tripService.updateBasicInfo(id, tripDto);
        //return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.created(URI.create("/" + tripDto.getId())).body(this.userTripRepository.findById(id));
    }
//
//    @GetMapping("/trips")
//    public ResponseEntity<?> listTrips() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        return ResponseEntity.ok(tripService.findAllTrips(authentication.getName()));
//    }

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
    @GetMapping("/trips/places/{id}/weather")
    public ResponseEntity<WeatherDTO> getWeatherForPlace(@PathVariable Long id) {
        Place place = placeRepository.findById(id).orElse(null);

        if (place == null) {
            return ResponseEntity.notFound().build();
        }

        String city = place.getName();

        WeatherDTO weatherDTO = weatherService.getWeatherForCity(city);

        if (weatherDTO == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.ok(weatherDTO);
    }
}
