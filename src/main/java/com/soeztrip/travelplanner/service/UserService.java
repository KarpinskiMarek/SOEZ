package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;



    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public UserEntity findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<UserDto> findAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map((user) -> mapUserDto(user)).collect(Collectors.toList());
    }

    private UserDto mapUserDto(UserEntity userEntity){
        UserDto userDto=UserDto.builder()
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

    public UserEntity findUser(Long id) {
        return userRepository.findById(id).get();
    }

    public UserEntity saveUser(UserDto userDto) {
        UserEntity userEntity =new UserEntity();
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(userEntity);
        return userEntity;
    }
}
