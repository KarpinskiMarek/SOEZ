package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.model.ChatRoom;
import com.soeztrip.travelplanner.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public ChatRoom findById(String id) {
        return chatRoomRepository.findById(id).orElse(null);
    }

    public void save(ChatRoom chatRoom) {
        chatRoomRepository.save(chatRoom);
    }
}