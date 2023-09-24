package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.model.Trip;
import com.soeztrip.travelplanner.model.User;
import com.soeztrip.travelplanner.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.net.URI;

@Controller
public class UserController {


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers(){
        return ResponseEntity.ok(userService.findAllUsers());
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<?> listUser(@PathVariable Long id){
        if(!userService.userExists(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(userService.findUser(id));
    }
    @PostMapping("/users/new")
    public ResponseEntity<?>createUser(User user){
        User result=userService.saveTrip(user);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(result);
    }
}
