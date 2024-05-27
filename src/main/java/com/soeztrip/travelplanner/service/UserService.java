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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
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

    public List<UserDto> getFriends(String email) {
        Long userId = Objects.requireNonNull(userRepository.findByEmail(email).orElse(null)).getId();
        List<UserEntity> friendsEntities = userRepository.friendsByUserId(userId);
        return friendsEntities.stream()
                .map(this::mapUserToDto)
                .collect(Collectors.toList());
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
    public void addFriend(String userEmail, Long friendId) {
        UserEntity user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserEntity friend = userRepository.findById(friendId).orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        user.getFriendList().add(friend);
        friend.getFriendList().add(user);

        userRepository.save(user);
        userRepository.save(friend);
    }
    @Transactional
    public void removeFriend(String email, Long friendId) {
        UserEntity user = userRepository.findByEmail(email).orElse(null);
        UserEntity friend = userRepository.findById(friendId).orElse(null);
        if (user != null && friend != null) {
            user.getFriendList().remove(friend);
            friend.getFriendList().remove(user);

            userRepository.save(user);
            userRepository.save(friend);
        } else {
            throw new IllegalArgumentException("User or friend not found :(");
        }
    }

}
