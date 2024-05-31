package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.TransportDto;
import com.soeztrip.travelplanner.model.Transport;
import com.soeztrip.travelplanner.repository.TransportRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransportService {

    private TransportRepository transportRepository;

    public TransportService(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    public void deleteTransport(Long id){
        transportRepository.deleteById(id);
    }

    public List<TransportDto> findAllTransports(){
        List<Transport>transports=transportRepository.findAll();
        return transports.stream().map(this::mapToTransportDto).collect(Collectors.toList());
    }

    private TransportDto mapToTransportDto(Transport transport){
        TransportDto transportDto=TransportDto.builder()
                .id(transport.getId())
                .ticket(transport.getTicket())
                .fromDate(transport.getFromDate())
                .toDate(transport.getToDate())
                .build();
        return transportDto;
    }
    public Transport saveTransport(TransportDto transportDto){
        Transport transport=mapToTransport(transportDto);
        return transportRepository.save(transport);
    }

    private Transport mapToTransport(TransportDto transportDto) {
        Transport transport=Transport.builder()
                .id(transportDto.getId())
                .ticket(transportDto.getTicket())
                .fromDate(transportDto.getFromDate())
                .toDate(transportDto.getToDate())
                .build();
        return transport;
    }
}
