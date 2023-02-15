package com.updatedparceltracker.services;

import com.updatedparceltracker.dto.JwtRequest;
import com.updatedparceltracker.dto.AuthResponse;
import com.updatedparceltracker.dto.JwtResponse;
import com.updatedparceltracker.dto.RegisterDto;
import com.updatedparceltracker.exception.ResourceNotFoundException;
import com.updatedparceltracker.model.Roles;
import com.updatedparceltracker.model.User;
import com.updatedparceltracker.repository.RoleRepository;
import com.updatedparceltracker.repository.UserRepository;
import com.updatedparceltracker.security.CustomUserDetailService;
import com.updatedparceltracker.util.Validation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterLoginControllerService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CustomUserDetailService customUserDetailService;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private PasswordEncoder passwordEncoder;
  final Logger logger=LoggerFactory.getLogger(RegisterLoginControllerService.class);
  public ResponseEntity<String> userRegister( RegisterDto registerdto)throws IllegalAccessException{
    if (Validation.isBlank(String.valueOf(registerdto))) {
      logger.error("request can't be null");
      throw new IllegalArgumentException("fields cannot be empty");
    }
    if(!Validation.validateEmail(registerdto.getEmail())){
      logger.error("Invalid email format: {}", registerdto.getEmail());
      throw new IllegalArgumentException("Invalid email format");
    }
    if (!Validation.validatePassword(registerdto.getPassword())) {
      logger.error("Invalid password format: {}", registerdto.getPassword());
      throw new IllegalArgumentException("Invalid password format");
    }
    if (!Validation.validatePhoneNumber(registerdto.getPhone())) {
      logger.error("Invalid phone number format: {}", registerdto.getPhone());
      throw new IllegalArgumentException("Invalid phone number format");
    }
    if(userRepository.existsByEmail(registerdto.getEmail())){
      logger.error("{} email is already taken",registerdto.getEmail());
      return ResponseEntity.ok("email is already taken");
    }
    User user=new User();
    user.setEmail(registerdto.getEmail());
    user.setName(registerdto.getName());
    user.setPhone(registerdto.getPhone());
    user.setPassword(passwordEncoder.encode(registerdto.getPassword()));
    Roles roles = roleRepository.findByName("ROLE_USER").orElseThrow(()->new UsernameNotFoundException("role exception"));
    user.setRoles(roles);
    userRepository.save(user);
    logger.info("user {} registered successfully",registerdto.getEmail());
    return ResponseEntity.ok("user registered successfully");
  }
  public ResponseEntity<JwtResponse> loginUser(JwtRequest jwtRequest){
    try{
      this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(),jwtRequest.getPassword()));
      logger.info("SuccessFully login by {}",jwtRequest.getEmail());
      String roles =userRepository.findByEmail(jwtRequest.getEmail()).orElseThrow().getRoles().getName();
      String token=this.jwtService.generateToken(jwtRequest.getEmail());
      return ResponseEntity.ok(new JwtResponse(token,roles));
    }catch(AuthenticationException e){
      logger.error("bad credentials given by {}",jwtRequest.getEmail());
      throw new ResourceNotFoundException(jwtRequest.getEmail(),"provided credentials ",0);
    }
  }
}
