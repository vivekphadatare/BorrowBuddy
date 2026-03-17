package com.borrowbuddy.borrowbuddy.repository;

import com.borrowbuddy.borrowbuddy.model.BorrowRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRequestRepository extends JpaRepository<BorrowRequest, Long> {
    List<BorrowRequest> findByBorrowerEmail(String email);
    List<BorrowRequest> findByOwnerEmail(String email);
}
