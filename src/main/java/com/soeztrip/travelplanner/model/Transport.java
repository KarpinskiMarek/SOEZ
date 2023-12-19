package com.soeztrip.travelplanner.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "transports")
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticket;

    private String fromDate;

    private String toDate;

    @OneToOne(mappedBy = "transport", cascade = CascadeType.ALL)
    private Place place;
}
