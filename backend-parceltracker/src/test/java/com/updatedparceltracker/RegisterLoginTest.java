package com.updatedparceltracker;

import com.updatedparceltracker.dto.AuthResponse;
import com.updatedparceltracker.dto.JwtRequest;
import com.updatedparceltracker.dto.JwtResponse;
import com.updatedparceltracker.dto.RegisterDto;
import com.updatedparceltracker.model.Roles;
import com.updatedparceltracker.model.User;
import com.updatedparceltracker.repository.ParcelRepository;
import com.updatedparceltracker.repository.RoleRepository;
import com.updatedparceltracker.repository.TrackingRepository;
import com.updatedparceltracker.repository.UserRepository;
import com.updatedparceltracker.services.JwtService;
import com.updatedparceltracker.services.ParcelControllerService;
import com.updatedparceltracker.services.RegisterLoginControllerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {RegisterLoginTest.class})
public class RegisterLoginTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private RegisterLoginControllerService controllerService;

    public List<User> user=new ArrayList<>();
    public Set<Roles> roles;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;

    @Test
    public void testUserRegisterSuccess() throws IllegalAccessException {
        Roles roles= new Roles(1,"ROLE_USER",user);
        User user = new User(2,"Test@example.com","Test User","1234567890","password@123",roles);
        RegisterDto registerDto=new RegisterDto("Test@example.com","Test User","1234567890","password@123");

        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(roles));
        when(userRepository.save(user)).thenReturn(null);
        when(passwordEncoder.encode(registerDto.getPassword())).thenReturn(null);
        assertEquals(ResponseEntity.ok(String.format("user registered successfully")),controllerService.userRegister(registerDto));
    }
    @Test
    public void testLoginUser_success() {
        JwtRequest jwtRequest = new JwtRequest("Test@example.com", "password@123");
        String role = "ROLE_ADMIN";

        User user = new User();
        user.setEmail(jwtRequest.getEmail());
        user.setPassword(passwordEncoder.encode(jwtRequest.getPassword()));
        Roles userRole = new Roles();
        userRole.setName(role);
        user.setRoles(userRole);
        when(userRepository.findByEmail(jwtRequest.getEmail())).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()))).thenReturn(null);
        when(jwtService.generateToken(jwtRequest.getEmail())).thenReturn("token");
        ResponseEntity<JwtResponse> response = controllerService.loginUser(jwtRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody().getAccessToken());
        assertEquals(role, response.getBody().getRole());
    }

}
