package com.soeztrip.travelplanner.service;


import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.repository.TripRepository;
import com.soeztrip.travelplanner.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private TripRepository tripRepository;

    private PlaceService placeService;

    @Autowired
    public TripService(TripRepository tripRepository, PlaceService placeService) {
        this.tripRepository = tripRepository;
        this.placeService = placeService;
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public TripDto findTrip(Long id) {
        Trip trip = tripRepository.findById(id).get();
        return mapToTripDto(trip);
    }

    public List<TripDto> findAllTrips(String email) {
        List<Trip> trips = tripRepository.findByUserEntities_Email(email);
        return trips.stream().map(this::mapToTripDto).collect(Collectors.toList());
    }

    public Trip mapToTrip(TripDto tripDto) {
        Trip trip = Trip.builder()
                .id(tripDto.getId())
                .startingDate(tripDto.getStartingDate())
                .endingDate(tripDto.getEndingDate())
                .finished(tripDto.getFinished())
                .title(tripDto.getTitle())
                .places(tripDto.getPlaces())
                .build();
        return trip;
    }

    public TripDto mapToTripDto(Trip trip) {
        TripDto tripDto = TripDto.builder()
                .id(trip.getId())
                .startingDate(trip.getStartingDate())
                .endingDate(trip.getEndingDate())
                .finished(trip.getFinished())
                .title(trip.getTitle())
                .places(trip.getPlaces())
                .build();
        return tripDto;
    }

    public Trip saveTrip(Trip trip) {
        //Trip trip = mapToTrip(tripDto);
        return tripRepository.save(trip);
    }

    public boolean tripExists(Long id) {
        return tripRepository.existsById(id);
    }

    public void updateTrip(TripDto tripDto) {
        Trip trip = mapToTrip(tripDto);
        tripRepository.save(trip);
    }
}
