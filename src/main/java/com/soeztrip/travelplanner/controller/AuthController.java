package com.soeztrip.travelplanner.controller;


import com.soeztrip.travelplanner.dto.LoginDto;
import com.soeztrip.travelplanner.dto.RegisterDto;
import com.soeztrip.travelplanner.dto.UserDto;
import com.soeztrip.travelplanner.model.Role;
import com.soeztrip.travelplanner.model.UserEntity;
import com.soeztrip.travelplanner.repository.RoleRepository;
import com.soeztrip.travelplanner.repository.UserRepository;
import com.soeztrip.travelplanner.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    //private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;


    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed", HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<?>createUser(@RequestBody RegisterDto registerDto){

        if(userRepository.existsByEmail(registerDto.getEmail())){
            return new ResponseEntity<>("Email is taken",HttpStatus.BAD_REQUEST);
        }

        UserEntity user=new UserEntity();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles=roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return ResponseEntity.created(URI.create("/"+user.getId())).body(user);
    }
}