package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.ChatRoomDTO;
import com.soeztrip.travelplanner.model.ChatRoom;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.service.ChatRoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final UserRepository userRepository;

    public ChatRoomController(ChatRoomService chatRoomService,UserRepository userRepository) {
        this.chatRoomService = chatRoomService;
        this.userRepository =userRepository;
    }

    @GetMapping("chatrooms/{chatRoomId}")
    public ResponseEntity<ChatRoomDTO> getChatRoom(@PathVariable Long chatRoomId) {
        ChatRoomDTO chatRoom = chatRoomService.getChatRoom(chatRoomId);
        return ResponseEntity.ok(chatRoom);
    }

    @GetMapping("chatrooms/{userId}/user-chatrooms")
    public ResponseEntity<List<ChatRoomDTO>> getChatRoomsForUser(@PathVariable Long userId) {
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRoomsForUser(userId);
        return ResponseEntity.ok(chatRooms);
    }

    @PostMapping("chatrooms/create")
    public ResponseEntity<?> createChatRoom(@RequestBody @Valid ChatRoomDTO chatRoomDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setName(chatRoomDTO.getName());
        chatRoom.getUserEntities().add(user);
        chatRoomService.saveChatRoom(chatRoom);

        return ResponseEntity.created(URI.create("/" + chatRoom.getId())).body(chatRoom);
    }

    @PostMapping("chatrooms/{chatRoomId}/addUser")
    public ResponseEntity<?> addUserToChatRoom(@PathVariable Long chatRoomId, @RequestParam Long userId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity creator = this.userRepository.findByEmail(email).orElseThrow();

        ChatRoom chatRoom = this.chatRoomService.getChatRoomById(chatRoomId);

        if (!chatRoom.getUserEntities().contains(creator)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to add users to this chatroom.");
        }

        UserEntity userToAdd = userRepository.findById(userId).orElseThrow();

        chatRoom.getUserEntities().add(userToAdd);
        chatRoomService.saveChatRoom(chatRoom);

        return ResponseEntity.ok().build();
    }


}
