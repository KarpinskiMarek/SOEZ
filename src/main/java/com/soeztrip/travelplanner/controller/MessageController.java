package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.MessageDTO;
import com.soeztrip.travelplanner.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/{chatRoomId}/send")
    public ResponseEntity<MessageDTO> sendMessage(@PathVariable Long chatRoomId, @RequestBody MessageDTO messageDTO) {
        MessageDTO savedMessage = messageService.sendMessage(chatRoomId, messageDTO);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<MessageDTO>> getAllMessagesInChatRoom(@PathVariable Long chatRoomId) {
        List<MessageDTO> messages = messageService.getAllMessagesInChatRoom(chatRoomId);
        return ResponseEntity.ok(messages);
    }
}
