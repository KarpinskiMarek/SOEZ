package com.soeztrip.travelplanner.repository;

import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.model.UserTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTripRepository extends JpaRepository<UserTrip, Long> {

    UserTrip findByUserAndTrip(UserEntity user, Trip trip);
}


