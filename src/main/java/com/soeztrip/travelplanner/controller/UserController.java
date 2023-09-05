package com.soeztrip.travelplanner.controller;

import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.User;
import com.soeztrip.travelplanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {


    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public String listUsers(Model model){
        List<UserDto> users=userService.findAllUsers();
                model.addAttribute("users",users);
        return "users-list";
    }
}
