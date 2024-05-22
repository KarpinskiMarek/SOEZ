package com.soeztrip.travelplanner.service;


import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.TripRole;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.model.UserTrip;
import com.soeztrip.travelplanner.repository.TripRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.repository.UserTripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    private TripRepository tripRepository;

    private UserRepository userRepository;

    private UserTripRepository userTripRepository;

    private TripRoleService tripRoleService;

    @Autowired
    public TripService(TripRepository tripRepository,
                       UserRepository userRepository,
                       UserTripRepository userTripRepository,
                       TripRoleService tripRoleService) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.userTripRepository = userTripRepository;
        this.tripRoleService = tripRoleService;
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public TripDto findTrip(Long id) {
        Trip trip = tripRepository.findById(id).get();
        return mapToTripDto(trip);
    }

    public List<TripDto> findAllTrips(String email) {
        List<Trip> trips = tripRepository.findByUserEmail(email);
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
                .participants(mapToUserDtoList(trip.getUserTrips()))
                .build();
        return tripDto;
    }

    private List<UserDto> mapToUserDtoList(List<UserTrip> userTrips) {
        return userTrips.stream()
                .map(userTrip -> UserDto.builder()
                        .id(userTrip.getUser().getId())
                        .firstName(userTrip.getUser().getFirstName())
                        .lastName(userTrip.getUser().getLastName())
                        .email(userTrip.getUser().getEmail())
                        .build())
                .collect(Collectors.toList());
    }

    public void saveTrip(TripDto tripDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        Trip trip = mapToTrip(tripDto);
        UserTrip userTrip = new UserTrip();
        userTrip.setUser(user);
        userTrip.setTrip(trip);
        TripRole role = tripRoleService.getRoleByName("OWNER");
        userTrip.setTripRole(role);
        tripRepository.save(trip);
        userTripRepository.save(userTrip);
    }

    public boolean tripExists(Long id) {
        return tripRepository.existsById(id);
    }

    private String checkUserRole(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String requesterEmail = authentication.getName();
        return userTripRepository.findRole(id, requesterEmail).orElseThrow();
    }

    public void updateTrip(Long id, TripDto tripDto) {
        String requesterRole = this.checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can modify trip properties");
        }

        Trip trip = this.tripRepository.findById(id).orElseThrow();
        if (tripDto.getStartingDate() != null) {
            trip.setStartingDate(tripDto.getStartingDate());
        }
        if (tripDto.getEndingDate() != null) {
            trip.setEndingDate(tripDto.getEndingDate());
        }
        if (tripDto.getFinished() != null) {
            trip.setFinished(tripDto.getFinished());
        }
        if (tripDto.getTitle() != null) {
            trip.setTitle(tripDto.getTitle());
        }

        tripRepository.save(trip);
    }

    public void addParticipant(Long id, String email) {
        String requesterRole = checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can add participants");
        }
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        Trip trip = this.tripRepository.findById(id).orElseThrow();
        UserTrip userTrip = new UserTrip();
        userTrip.setUser(user);
        userTrip.setTrip(trip);
        TripRole role = tripRoleService.getRoleByName("PARTICIPANT");
        userTrip.setTripRole(role);
        userTripRepository.save(userTrip);
    }

    public void removeParticipant(Long id, String email) {
        String requesterRole = checkUserRole(id);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can remove participants");
        }
        UserEntity tripOwner = userTripRepository.findOwner(id).orElseThrow();
        if (tripOwner.getEmail().equals(email)) {
            throw new RuntimeException("Owner can not be removed from the trip");
        }
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        Trip trip = this.tripRepository.findById(id).orElseThrow();
        UserTrip userTrip = userTripRepository.findByUserAndTrip(user, trip);
        userTripRepository.delete(userTrip);
        tripRepository.save(trip);
    }

    public void changeRole(Long id, String email, String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String requesterEmail = authentication.getName();
        UserEntity tripOwner = userTripRepository.findOwner(id).orElseThrow();
        if (!tripOwner.getEmail().equals(requesterEmail)) {
            throw new RuntimeException("Only trip owner can change roles");
        }
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        Trip trip = this.tripRepository.findById(id).orElseThrow();
        UserTrip userTrip = userTripRepository.findByUserAndTrip(user, trip);

        TripRole tripRole = tripRoleService.getRoleByName(role);
        userTrip.setTripRole(tripRole);
        userTripRepository.save(userTrip);
    }
}