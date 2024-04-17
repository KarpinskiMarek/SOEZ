package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.ChatRoomDTO;
import com.soeztrip.travelplanner.service.ChatRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ChatRoomDTO> getChatRoom(@PathVariable Long chatRoomId) {
        ChatRoomDTO chatRoom = chatRoomService.getChatRoom(chatRoomId);
        return ResponseEntity.ok(chatRoom);
    }

    @GetMapping("/{userId}/user-chatrooms")
    public ResponseEntity<List<ChatRoomDTO>> getChatRoomsForUser(@PathVariable Long userId) {
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRoomsForUser(userId);
        return ResponseEntity.ok(chatRooms);
    }

    @PostMapping("/create")
    public ResponseEntity<ChatRoomDTO> createChatRoom(@RequestBody ChatRoomDTO chatRoomDTO) {
        ChatRoomDTO createdChatRoom = chatRoomService.createChatRoom(chatRoomDTO);
        return ResponseEntity.ok(createdChatRoom);
    }
}
