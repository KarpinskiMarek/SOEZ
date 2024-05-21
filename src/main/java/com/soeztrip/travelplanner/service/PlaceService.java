package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.TripRepository;
import com.soeztrip.travelplanner.repository.UserTripRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private PlaceRepository placeRepository;
    private TripRepository tripRepository;
    private UserTripRepository userTripRepository;

    public PlaceService(PlaceRepository placeRepository,
                        TripRepository tripRepository,
                        UserTripRepository userTripRepository) {
        this.placeRepository = placeRepository;
        this.tripRepository = tripRepository;
        this.userTripRepository = userTripRepository;
    }


    public void addNewPlace(Long id, PlaceDto dto) {
        String requesterRole = this.checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can create new places");
        }
        Place place = new Place();
        place.setName(dto.getName());
        place.setArrive(dto.getArrive());
        place.setLeave(dto.getLeave());
        place.setTicket(dto.getTicket());
        place.setCountry(dto.getCountry());
        Trip trip = this.tripRepository.findById(id).orElseThrow();
        place.setTrip(trip);
        trip.getPlaces().add(place);
        tripRepository.save(trip);

    }

    public void deletePlace(Long id) {
        String requesterRole = this.checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can delete places");
        }
        placeRepository.deleteById(id);
    }

    public List<PlaceDto> findAllPlaces() {
        List<Place> places = placeRepository.findAll();
        return places.stream().map(this::mapToPlaceDto).collect(Collectors.toList());
    }

    protected PlaceDto mapToPlaceDto(Place place) {
        PlaceDto placeDto = PlaceDto.builder()
                .id(place.getId())
                .name(place.getName())
                .arrive(place.getArrive())
                .leave(place.getLeave())
                .ticket(place.getTicket())
                .country(place.getCountry())
                .build();
        return placeDto;
    }

    public Place savePlace(PlaceDto placeDto) {
        Place place = mapToPlace(placeDto);
        return placeRepository.save(place);
    }

    public Place mapToPlace(PlaceDto placeDto) {
        Place place = Place.builder()
                .id(placeDto.getId())
                .name(placeDto.getName())
                .arrive(placeDto.getArrive())
                .leave(placeDto.getLeave())
                .ticket(placeDto.getTicket())
                .country(placeDto.getCountry())
                .build();
        return place;
    }

    public boolean placeExists(Long id) {
        return placeRepository.existsById(id);
    }

    public void updatePlace(Long id, PlaceDto dto) {
        String requesterRole = this.checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can modify place properties");
        }
        Place place=this.placeRepository.findById(id).orElseThrow();
        if (dto.getName() != null) {
            place.setName(dto.getName());
        }
        if (dto.getArrive() != null) {
            place.setArrive(dto.getArrive());
        }
        if (dto.getLeave() != null) {
            place.setLeave(dto.getLeave());
        }
        if (dto.getTicket() != null) {
            place.setTicket(dto.getTicket());
        }
        if (dto.getCountry() != null) {
            place.setCountry(dto.getCountry());
        }
        placeRepository.save(place);
    }

    private String checkUserRole(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String requesterEmail = authentication.getName();
        return userTripRepository.findRole(id, requesterEmail).orElseThrow();
    }
}
