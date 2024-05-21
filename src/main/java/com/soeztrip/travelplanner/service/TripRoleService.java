package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.model.TripRole;
import com.soeztrip.travelplanner.repository.TripRoleRepository;
import org.springframework.stereotype.Service;

@Service
public class TripRoleService {

    private TripRoleRepository tripRoleRepository;

    public TripRoleService(TripRoleRepository tripRoleRepository) {
        this.tripRoleRepository = tripRoleRepository;
    }

    public TripRole getRoleByName(String name) {
        return tripRoleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found: " + name));
    }
}
