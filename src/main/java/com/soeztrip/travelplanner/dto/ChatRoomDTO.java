package com.soeztrip.travelplanner.dto;


import lombok.Data;

import java.util.Set;

@Data
public class ChatRoomDTO {
    private Long id;
    private String name;
    private Set<Long> userIds;
}