package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.Role;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.RoleRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.catalina.User;
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
        this.roleRepository=roleRepository;
    }

    public List<UserDto> findAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities.stream().map(this::mapUserToDto).collect(Collectors.toList());
    }

    public UserEntity findUser(Long id) {
        return userRepository.findById(id).get();
    }

    public UserEntity findUserByEmail(String email) {
        return userRepository.findByEmail(email);
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

    public void saveUser(UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setPassword(userDto.getPassword());
        Role role=roleRepository.findByName("USER");
        userEntity.setRoles(Arrays.asList(role));
        userRepository.save(userEntity);
    }

    public void updateUser(UserDto userDto) {
        UserEntity existingUser = userRepository.findById(userDto.getId()).orElse(null);
        if (existingUser == null) {
            throw new EntityNotFoundException("Użytkownik o podanym identyfikatorze nie istnieje.");
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
}
