package com.soeztrip.travelplanner.repository;

import com.soeztrip.travelplanner.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    //UserEntity findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<UserEntity>findByEmail(String email);
}
