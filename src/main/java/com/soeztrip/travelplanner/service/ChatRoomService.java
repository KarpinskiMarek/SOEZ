package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.ChatRoomDTO;
import com.soeztrip.travelplanner.exception.ChatRoomNotFoundException;
import com.soeztrip.travelplanner.model.ChatRoom;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public ChatRoomDTO getChatRoom(Long chatRoomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException("Chat room not found with id: " + chatRoomId));


        return mapChatRoomToDTO(chatRoom);
    }

    public List<ChatRoomDTO> getChatRoomsForUser(Long userId) {

        List<ChatRoom> chatRooms = chatRoomRepository.findByUserEntitiesId(userId);


        return chatRooms.stream()
                .map(this::mapChatRoomToDTO)
                .collect(Collectors.toList());
    }

    public ChatRoomDTO createChatRoom(ChatRoomDTO chatRoomDTO) {

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setName(chatRoomDTO.getName());


        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);


        return mapChatRoomToDTO(savedChatRoom);
    }

    private ChatRoomDTO mapChatRoomToDTO(ChatRoom chatRoom) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setId(chatRoom.getId());
        chatRoomDTO.setName(chatRoom.getName());
        chatRoomDTO.setUserIds(chatRoom.getUserEntities().stream().map(UserEntity::getId).collect(Collectors.toSet()));
        return chatRoomDTO;
    }
}
