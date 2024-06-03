package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.dto.TicketDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Ticket;
import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private PlaceRepository placeRepository;
    private TripRepository tripRepository;
    private TripService tripService;
    private FileService fileService;
    private TripRoleService tripRoleService;

    public PlaceService(PlaceRepository placeRepository,
                        TripRepository tripRepository,
                        TripService tripService,
                        FileService fileService,
                        TripRoleService tripRoleService) {
        this.placeRepository = placeRepository;
        this.tripRepository = tripRepository;
        this.tripService = tripService;
        this.fileService = fileService;
        this.tripRoleService = tripRoleService;
    }


    public Long addNewPlace(Long tripId, PlaceDto dto) {
        String requesterRole = tripRoleService.checkUserRole(tripId);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can create new places");
        }

        Place place = new Place();
        place.setName(dto.getName());
        place.setArrive(dto.getArrive());
        place.setLeave(dto.getLeave());
        place.setCountry(dto.getCountry());
        Trip trip = this.tripRepository.findById(tripId).orElseThrow();
        place.setTrip(trip);

        Place theCreatedPlace = placeRepository.save(place);
        trip.getPlaces().add(place);
        tripRepository.save(trip);
        return theCreatedPlace.getId();
    }

    public void deletePlace(Long placeId, Long tripId) {
        String requesterRole = tripRoleService.checkUserRole(tripId);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can delete places");
        }
        Place place = this.placeRepository.findById(placeId).orElseThrow();
        List<Ticket> ticketList = place.getTickets();
        if (ticketList != null && !ticketList.isEmpty()) {
            ticketList.stream().map(Ticket::getTicketPath).forEach(fileService::removeFile);
        }
        placeRepository.deleteById(placeId);
    }

    public Place savePlace(PlaceDto placeDto) {
        Place place = tripService.mapToPlace(placeDto);
        return placeRepository.save(place);
    }

    public boolean placeExists(Long id) {
        return placeRepository.existsById(id);
    }

    public void updatePlace(Long placeId, PlaceDto dto) {
        Place place = this.placeRepository.findById(placeId).orElseThrow();
        Long tripId = place.getTrip().getId();
        String requesterRole = tripRoleService.checkUserRole(tripId);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can modify place properties");
        }

        if (dto.getName() != null) {
            place.setName(dto.getName());
        }
        if (dto.getArrive() != null) {
            place.setArrive(dto.getArrive());
        }
        if (dto.getLeave() != null) {
            place.setLeave(dto.getLeave());
        }
        if (dto.getCountry() != null) {
            place.setCountry(dto.getCountry());
        }
        if (dto.getPrompt() != null) {
            place.setPrompt(dto.getPrompt());
        }
        placeRepository.save(place);
    }

    public List<TicketDto> getTickets(Long id) {
        Place place = this.placeRepository.findById(id).orElseThrow();
        List<Ticket> ticketList = place.getTickets();
        List<TicketDto> ticketDtoList = ticketList.stream().map(tripService::mapToTicketDto).collect(Collectors.toList());
        return ticketDtoList;
    }
}
