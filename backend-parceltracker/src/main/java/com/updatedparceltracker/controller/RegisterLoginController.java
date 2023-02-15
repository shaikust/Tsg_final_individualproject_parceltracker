package com.updatedparceltracker.controller;

import com.updatedparceltracker.dto.JwtRequest;
import com.updatedparceltracker.dto.JwtResponse;
import com.updatedparceltracker.dto.RegisterDto;
import com.updatedparceltracker.services.RegisterLoginControllerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/controller")@CrossOrigin
public class RegisterLoginController {
@Autowired
 private RegisterLoginControllerService controllerService;
    @PostMapping("register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerdto) throws IllegalAccessException {
      return controllerService.userRegister(registerdto);

    }
    @PostMapping("login")
    public ResponseEntity<JwtResponse> userLogin(@RequestBody JwtRequest jwtRequest){
      return controllerService.loginUser(jwtRequest);

    }
}
