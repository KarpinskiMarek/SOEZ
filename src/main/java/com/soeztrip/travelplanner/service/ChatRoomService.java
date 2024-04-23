package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.ChatRoomDTO;
import com.soeztrip.travelplanner.exception.ChatRoomNotFoundException;
import com.soeztrip.travelplanner.model.ChatRoom;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.ChatRoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
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

    public ChatRoomDTO mapChatRoomToDTO(ChatRoom chatRoom) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setId(chatRoom.getId());
        chatRoomDTO.setName(chatRoom.getName());
        chatRoomDTO.setUserIds(chatRoom.getUserEntities().stream().map(UserEntity::getId).collect(Collectors.toSet()));
        return chatRoomDTO;
    }

    public void saveChatRoom(ChatRoom chatRoom) {
        chatRoomRepository.save(chatRoom);
    }

    public ChatRoom mapToChatRoom(ChatRoomDTO chatRoomDTO) {
        ChatRoom chatRoom = ChatRoom.builder()
                .id(chatRoomDTO.getId())
                .name(chatRoomDTO.getName())
                .userIds(chatRoomDTO.getUserIds())
                .build();
        return chatRoom;
    }
    public ChatRoomDTO mapToChatRoomDto(ChatRoom chatRoom) {
        ChatRoomDTO chatRoomDto = new ChatRoomDTO();
        chatRoomDto.setId(chatRoom.getId());
        chatRoomDto.setName(chatRoom.getName());
        Set<Long> userIds = chatRoom.getUserEntities().stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        chatRoomDto.setUserIds(userIds);

        return chatRoomDto;
    }
    public ChatRoom getChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new EntityNotFoundException("ChatRoom with id " + chatRoomId + " not found"));
    }
}