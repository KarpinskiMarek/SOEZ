package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.model.Message;
import com.soeztrip.travelplanner.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository chatMessageRepository;

    @Autowired
    public MessageService(MessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public void saveMessage(Message message) {
        chatMessageRepository.save(message);
    }

    public List<Message> getChatHistoryForUser(String username) {
        // Tutaj by się przydała logika pobierania historii czatu dla danego użytkownika xd
        return chatMessageRepository.findBySender(username);
    }
}