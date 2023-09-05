package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.User;
import com.soeztrip.travelplanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

   @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> mapUserDto(user)).collect(Collectors.toList());
    }

    private UserDto mapUserDto(User user){
        UserDto userDto=UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(user.getPassword()).build();
        return userDto;

    }

}
