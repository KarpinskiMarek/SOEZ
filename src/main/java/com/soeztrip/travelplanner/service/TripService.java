package com.soeztrip.travelplanner.service;


import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public TripDto findTrip(Long id) {
        Trip trip = tripRepository.findById(id).get();
        return mapToTripDto(trip);
    }

    public List<TripDto> findAllTrips() {
        List<Trip> trips = tripRepository.findAll();
        return trips.stream().map(this::mapToTripDto).collect(Collectors.toList());
    }

    private Trip mapToTrip(TripDto tripDto) {
        Trip trip = Trip.builder()
                .id(tripDto.getId())
                .startingDate(tripDto.getStartingDate())
                .endingDate(tripDto.getEndingDate())
                .startingPoint(tripDto.getStartingPoint())
                .destinationPoint(tripDto.getDestinationPoint())
                .finished(tripDto.getFinished())
                .title(tripDto.getTitle())
                .build();
        return trip;
    }

    private TripDto mapToTripDto(Trip trip) {
        TripDto tripDto = TripDto.builder()
                .id(trip.getId())
                .startingDate(trip.getStartingDate())
                .endingDate(trip.getEndingDate())
                .startingPoint(trip.getStartingPoint())
                .destinationPoint(trip.getDestinationPoint())
                .finished(trip.getFinished())
                .title(trip.getTitle()).build();
        return tripDto;
    }

    public Trip saveTrip(TripDto tripDto) {
        Trip trip = mapToTrip(tripDto);
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
