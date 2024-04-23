package com.soeztrip.travelplanner.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty
    private String content;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private ChatRoom chatRoom;


}