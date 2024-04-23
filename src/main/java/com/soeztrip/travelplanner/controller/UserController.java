package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@Controller
public class UserController {

    private UserService userService;

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

    @GetMapping("/users/get")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(userService.getUserByEmail(authentication.getName()));
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
    @PostMapping("/users/{id}/add-friend")
    public ResponseEntity<?> addFriend(@PathVariable Long id, @RequestParam Long friendId) {
        if (!userService.userExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (!userService.userExists(friendId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Friend not found");
        }
        userService.addFriend(id, friendId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/users/{id}/remove-friend")
    public ResponseEntity<?> removeFriend(@PathVariable Long id, @RequestParam Long friendId) {
        if (!userService.userExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (!userService.userExists(friendId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Friend not found");
        }
        userService.removeFriend(id, friendId);
        return ResponseEntity.ok().build();
    }
}
