package com.soeztrip.travelplanner.repository;


import com.soeztrip.travelplanner.model.ChatRoom;
import com.soeztrip.travelplanner.model.Message;
import com.soeztrip.travelplanner.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySender(UserEntity sender);

    List<Message> findBySender(UserEntity sender);
}