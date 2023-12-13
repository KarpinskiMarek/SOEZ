package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.TripDto;
import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.Role;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.RoleRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;


@Controller
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private UserService userService;
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> listUser(@PathVariable Long id) {
        if (!userService.userExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(userService.findUser(id));
    }

    @PostMapping("/users/new")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserDto userDto, BindingResult bindingResult) {

        UserEntity existingUserEntity = userService.findUserByEmail(userDto.getEmail());

        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("data has errors");
        }

        if (existingUserEntity != null && existingUserEntity.getEmail() != null && !existingUserEntity.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account registered with this email already exists");
        }

        logger.info(userDto.getFirstName());
        logger.info(userDto.getPassword());
        userService.saveUser(userDto);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id,
                                      @Valid @RequestBody UserDto userDto,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("data has errors");
        }
        if (!userService.userExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userDto.setId(id);
        userService.updateUser(userDto);
        return ResponseEntity.created(URI.create("/" + userDto.getId())).body(userDto);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userService.userExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
