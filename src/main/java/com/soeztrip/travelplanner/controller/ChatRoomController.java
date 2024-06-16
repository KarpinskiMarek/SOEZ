package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.ChatMessage;
import com.soeztrip.travelplanner.exception.ChatRoomNotFoundException;
import com.soeztrip.travelplanner.exception.UserNotFoundException;
import com.soeztrip.travelplanner.model.Message;
import com.soeztrip.travelplanner.repository.ChatRoomRepository;
import com.soeztrip.travelplanner.repository.MessageRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Timestamp;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ChatRoomController {

    private SimpMessagingTemplate messagingTemplate;
    private MessageRepository messageRepository;
    private ChatRoomRepository chatRoomRepository;
    private UserRepository userRepository;

    public ChatRoomController(SimpMessagingTemplate messagingTemplate,
                              MessageRepository messageRepository,
                              ChatRoomRepository chatRoomRepository,
                              UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    @MessageMapping("/chat.sendMessage/{chatRoomId}")
    public void sendMessage(ChatMessage chatMessage, @DestinationVariable Long chatRoomId) {
        // Zapisz wiadomość do bazy danych
        Message message = new Message();
        message.setChatRoom(chatRoomRepository.findById(chatRoomId).orElseThrow(()
                -> new ChatRoomNotFoundException("ChatRoom not found")));
        message.setUser(userRepository.findById(chatMessage.getUserId()).orElseThrow(()
                -> new UserNotFoundException("User not found")));
        message.setContent(chatMessage.getContent());
        message.setTimestamp(new Timestamp(System.currentTimeMillis()));
        messageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId, chatMessage);
    }
    @MessageMapping("/chat.addUser/{chatRoomId}")
    public void addUser(ChatMessage chatMessage, @DestinationVariable Long chatRoomId) {
        chatMessage.setContent(chatMessage.getSender() + " joined");
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId, chatMessage);
    }

    @GetMapping("/chat/{chatRoomId}/history")
    public ResponseEntity<?> getHistory(@PathVariable Long chatRoomId){
        List<Message>messageList=this.messageRepository.findByChatRoomId(chatRoomId);
        return ResponseEntity.ok().body(messageList);
    }
    //    private final ChatRoomService chatRoomService;
//    private final UserRepository userRepository;
//
//    public ChatRoomController(ChatRoomService chatRoomService,UserRepository userRepository) {
//        this.chatRoomService = chatRoomService;
//        this.userRepository =userRepository;
//    }
//
//    @GetMapping("chatrooms/{chatRoomId}")
//    public ResponseEntity<ChatRoomDTO> getChatRoom(@PathVariable Long chatRoomId) {
//        ChatRoomDTO chatRoom = chatRoomService.getChatRoom(chatRoomId);
//        return ResponseEntity.ok(chatRoom);
//    }
//
//    @GetMapping("chatrooms/{userId}/user-chatrooms")
//    public ResponseEntity<List<ChatRoomDTO>> getChatRoomsForUser(@PathVariable Long userId) {
//        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRoomsForUser(userId);
//        return ResponseEntity.ok(chatRooms);
//    }
//
//    @PostMapping("chatrooms/create")
//    public ResponseEntity<?> createChatRoom(@RequestBody @Valid ChatRoomDTO chatRoomDTO) {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        UserEntity user = this.userRepository.findByEmail(email).orElseThrow();
//        ChatRoom chatRoom = new ChatRoom();
//        chatRoom.setName(chatRoomDTO.getName());
//        chatRoom.getUserEntities().add(user);
//        chatRoomService.saveChatRoom(chatRoom);
//
//        return ResponseEntity.created(URI.create("/" + chatRoom.getId())).body(chatRoom);
//    }
//
//    @PostMapping("chatrooms/{chatRoomId}/addUser")
//    public ResponseEntity<?> addUserToChatRoom(@PathVariable Long chatRoomId, @RequestParam Long userId) {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        UserEntity creator = this.userRepository.findByEmail(email).orElseThrow();
//
//        ChatRoom chatRoom = this.chatRoomService.getChatRoomById(chatRoomId);
//
//        if (!chatRoom.getUserEntities().contains(creator)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to add users to this chatroom.");
//        }
//
//        UserEntity userToAdd = userRepository.findById(userId).orElseThrow();
//
//        chatRoom.getUserEntities().add(userToAdd);
//        chatRoomService.saveChatRoom(chatRoom);
//
//        return ResponseEntity.ok().build();
//    }
}
