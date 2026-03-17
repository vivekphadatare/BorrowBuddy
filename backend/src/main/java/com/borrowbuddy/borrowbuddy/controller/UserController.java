package com.borrowbuddy.borrowbuddy.controller;

import com.borrowbuddy.borrowbuddy.model.User;
import com.borrowbuddy.borrowbuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ POST: Register a user
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ GET: Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ POST: Login a user (with response handling)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        String email = loginData.getEmail();
        String password = loginData.getPassword();

        User user = userRepository.findByEmailAndPassword(email, password);

        if (user != null) {
            return ResponseEntity.ok(user); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid credentials");
        }
    }
}
