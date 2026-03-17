package com.borrowbuddy.borrowbuddy.repository;

import com.borrowbuddy.borrowbuddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByEmailAndPassword(String email, String password); // ✅ Add this line
}
