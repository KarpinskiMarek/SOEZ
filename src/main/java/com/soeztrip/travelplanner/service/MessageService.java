//package com.soeztrip.travelplanner.service;
//
//import com.soeztrip.travelplanner.dto.MessageDTO;
//import com.soeztrip.travelplanner.exception.ChatRoomNotFoundException;
//import com.soeztrip.travelplanner.exception.UserNotFoundException;
//import com.soeztrip.travelplanner.model.ChatRoom;
//import com.soeztrip.travelplanner.model.Message;
//import com.soeztrip.travelplanner.model.UserEntity;
//import com.soeztrip.travelplanner.repository.ChatRoomRepository;
//import com.soeztrip.travelplanner.repository.MessageRepository;
//import com.soeztrip.travelplanner.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//public class MessageService {
//
//    private final MessageRepository messageRepository;
//    private final ChatRoomRepository chatRoomRepository;
//    private final UserRepository userRepository;
//
//    public MessageService(MessageRepository messageRepository, ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
//        this.messageRepository = messageRepository;
//        this.chatRoomRepository = chatRoomRepository;
//        this.userRepository = userRepository;
//    }
//
//    public MessageDTO sendMessage(Long chatRoomId, MessageDTO messageDTO) {
//
//        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
//                .orElseThrow(() -> new ChatRoomNotFoundException("Chat room not found with id: " + chatRoomId));
//        UserEntity sender = userRepository.findById(messageDTO.getSenderId())
//                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + messageDTO.getSenderId()));
//
//        Message message = new Message();
//        message.setContent(messageDTO.getContent());
//        message.setSender(sender);
//        message.setChatRoom(chatRoom);
//
//
//        Message savedMessage = messageRepository.save(message);
//
//
//        return mapMessageToDTO(savedMessage);
//    }
//
//    private MessageDTO mapMessageToDTO(Message message) {
//        MessageDTO messageDTO = new MessageDTO();
//        messageDTO.setId(message.getId());
//        messageDTO.setContent(message.getContent());
//        messageDTO.setSenderId(message.getSender().getId());
//        messageDTO.setChatRoomId(message.getChatRoom().getId());
//        return messageDTO;
//    }
//
//    public List<MessageDTO> getAllMessagesInChatRoom(Long chatRoomId) {
//
//        Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findById(chatRoomId);
//        if (!chatRoomOptional.isPresent()) {
//            throw new ChatRoomNotFoundException("Chat room not found with id: " + chatRoomId);
//        }
//
//
//        ChatRoom chatRoom = chatRoomOptional.get();
//        List<Message> messages = chatRoom.getMessages();
//
//        List<MessageDTO> messageDTOs = messages.stream()
//                .map(this::mapMessageToDTO)
//                .collect(Collectors.toList());
//
//        return messageDTOs;
//    }
//}
