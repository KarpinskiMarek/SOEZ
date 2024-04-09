package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.dto.UserNameDto;
import com.soeztrip.travelplanner.model.Role;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.RoleRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<UserDto> findAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map(this::mapUserToDto).collect(Collectors.toList());
    }

    public UserEntity findUser(Long id) {
        return userRepository.findById(id).get();
    }

    public UserNameDto getUserByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("email not found"));
        return mapUserToUserNameDto(user);
    }

    private UserNameDto mapUserToUserNameDto(UserEntity userEntity) {
        UserNameDto userDto = UserNameDto.builder()
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName()).build();
        return userDto;
    }

    private UserDto mapUserToDto(UserEntity userEntity) {
        UserDto userDto = UserDto.builder()
                .id(userEntity.getId())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword()).build();
        return userDto;

    }

    public boolean userExists(Long id) {
        return userRepository.existsById(id);
    }


    public void updateUser(UserDto userDto) {
        UserEntity existingUser = userRepository.findById(userDto.getId()).orElse(null);
        if (existingUser == null) {
            throw new EntityNotFoundException("The user with the specified ID does not exist.");
        }
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setPassword(userDto.getPassword());

        userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    @Transactional
    public void addFriend(Long userId, Long friendId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        UserEntity friend = userRepository.findById(friendId).orElse(null);

        if (user != null && friend != null) {
            user.getFriendList().add(friend);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User or friend not found");
        }
    }
    @Transactional
    public void removeFriend(Long userId, Long friendId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        UserEntity friend = userRepository.findById(friendId).orElse(null);

        if (user != null && friend != null) {
            user.getFriendList().remove(friend);
            userRepository.save(user);
        } else {
            // Obsługa przypadku, gdy użytkownik lub znajomy nie istnieje
            throw new IllegalArgumentException("User or friend not found");
        }
    }
}
