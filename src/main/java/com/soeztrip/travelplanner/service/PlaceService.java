package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.PlaceDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public void deletePlace(Long id){
        placeRepository.deleteById(id);
    }

    public List<PlaceDto> findAllPlaces(){
        List<Place>places=placeRepository.findAll();
        return places.stream().map(this::mapToPlaceDto).collect(Collectors.toList());
    }

    protected PlaceDto mapToPlaceDto(Place place) {
        PlaceDto placeDto=PlaceDto.builder()
                .id(place.getId())
                .name(place.getName())
                .arrive(place.getArrive())
                .leave(place.getLeave())
                .ticket(place.getTicket())
                .build();
        return placeDto;
    }

    public Place savePlace(PlaceDto placeDto){
        Place place=mapToPlace(placeDto);
        return placeRepository.save(place);
    }

    protected Place mapToPlace(PlaceDto placeDto){
        Place place=Place.builder()
                .id(placeDto.getId())
                .name(placeDto.getName())
                .arrive(placeDto.getArrive())
                .leave(placeDto.getLeave())
                .ticket(placeDto.getTicket())
                .build();
        return place;
    }
}
