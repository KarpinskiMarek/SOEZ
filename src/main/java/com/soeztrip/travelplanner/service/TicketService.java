package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.TicketDto;
import com.soeztrip.travelplanner.model.Place;
import com.soeztrip.travelplanner.model.Ticket;
import com.soeztrip.travelplanner.repository.PlaceRepository;
import com.soeztrip.travelplanner.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class TicketService {

    private TicketRepository ticketRepository;
    private PlaceRepository placeRepository;
    private TripRoleService tripRoleService;

    public TicketService(TicketRepository ticketRepository,
                         PlaceRepository placeRepository,
                         TripRoleService tripRoleService) {
        this.ticketRepository = ticketRepository;
        this.placeRepository = placeRepository;
        this.tripRoleService = tripRoleService;
    }

    public void newTicket(Long placeId, TicketDto dto) {
        Ticket ticket = new Ticket();
        Place place = this.placeRepository.findById(placeId).orElseThrow();
        ticket.setName(dto.getName());
        ticket.setTicketPath(dto.getTicketPath());
        ticket.setPlace(place);
        ticketRepository.save(ticket);
        place.getTickets().add(ticket);
        placeRepository.save(place);
    }

    public void editTicket() {

    }

    public void deleteTicket(Long tripId, Long placeId, Long ticketId) {
        String requesterRole = tripRoleService.checkUserRole(tripId);
        if (!"OWNER".equals(requesterRole) && !"MANAGER".equals(requesterRole)) {
            throw new RuntimeException("Only the trip owner or manager can delete places");
        }
        Ticket ticket = this.ticketRepository.findById(ticketId).orElseThrow();
        removeFile(ticket.getTicketPath());
        ticketRepository.deleteById(ticketId);

    }

    public String saveTicketFile(Long tripId, Long placeId, MultipartFile ticketFile) {
        if (ticketFile != null && !ticketFile.isEmpty()) {
            try {
                String fileName = ticketFile.getOriginalFilename();
                String projectRootDirectory = System.getProperty("user.dir");
                Path directoryPath = Paths.get(projectRootDirectory, "TripData", tripId.toString(), placeId.toString());
                if (!Files.exists(directoryPath)) {
                    Files.createDirectories(directoryPath);
                }
                Path filePath = directoryPath.resolve(fileName);
                Files.copy(ticketFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                return filePath.toString();

            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to save the file", e);
            }
        }
        return null;
    }

    protected void removeFile(String ticketPath) {
        if (ticketPath != null && !ticketPath.isEmpty()) {
            Path path = Paths.get(ticketPath);
            try {
                if (Files.exists(path)) {
                    Files.delete(path);
                    System.out.println("File deleted successfully: " + ticketPath);
                } else {
                    System.out.println("File not found: " + ticketPath);
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to delete the file", e);
            }
        }
    }

    protected void removeFiles(List<Ticket> ticketList) {
        if (ticketList != null && !ticketList.isEmpty()) {
            for (Ticket ticket : ticketList) {
                String ticketPath = ticket.getTicketPath();
                if (ticketPath != null && !ticketPath.isEmpty()) {
                    removeFile(ticketPath);
                }
            }
        }
    }

    public boolean ticketExists(Long id) {
        return ticketRepository.existsById(id);
    }

    public File downloadTicket(Long id) {
        Ticket ticket = this.ticketRepository.findById(id).orElseThrow();
        return new File(ticket.getTicketPath());
    }
}
