package com.soeztrip.travelplanner.repository;

import com.soeztrip.travelplanner.model.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepository extends JpaRepository<Transport,Long> {
}
