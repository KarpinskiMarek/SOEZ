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

    public TripService(TripRepository tripRepository){
        this.tripRepository=tripRepository;
    }

    public List<TripDto> findAllTrips(){
        List<Trip>trips=tripRepository.findAll();
        return trips.stream().map((trip) -> mapTripDto(trip)).collect(Collectors.toList());
    }

    private TripDto mapTripDto(Trip trip) {
        TripDto tripDto=TripDto.builder()
                .id(trip.getId())
                .startingDate(trip.getStartingDate())
                .endingDate(trip.getEndingDate())
                .startingPoint(trip.getStartingPoint())
                .destinationPoint(trip.getDestinationPoint())
                .finished(trip.getFinished())
                .title(trip.getTitle()).build();
        return tripDto;
    }

    public boolean tripExists(Long id) {
        return tripRepository.existsById(id);
    }

    public Trip findTrip(Long id) {
        return tripRepository.findById(id).get();
    }

    public Trip saveTrip(Trip trip) {
        tripRepository.save(trip);
        return trip;
    }
}
