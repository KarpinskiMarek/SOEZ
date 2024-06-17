package com.soeztrip.travelplanner.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private Long messageId;
    private String content;
    private String sender;
    private Long userId;
    private MessageType type;
}
