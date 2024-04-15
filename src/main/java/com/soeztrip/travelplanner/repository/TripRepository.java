package com.soeztrip.travelplanner.repository;

import com.soeztrip.travelplanner.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip,Long> {
    List<Trip> findByUserEntities_Email(String email);
}
