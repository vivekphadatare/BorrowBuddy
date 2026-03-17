package com.borrowbuddy.borrowbuddy.controller;

import com.borrowbuddy.borrowbuddy.model.BorrowRequest;
import com.borrowbuddy.borrowbuddy.repository.BorrowRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class BorrowRequestController {

    @Autowired
    private BorrowRequestRepository borrowRequestRepository;

    // POST: Make a new borrow request
    @PostMapping("/create")
    public BorrowRequest createRequest(@RequestBody BorrowRequest request) {
        request.setStatus("Pending");
        return borrowRequestRepository.save(request);
    }

    // GET: Get all requests for a borrower
    @GetMapping("/borrower/{email}")
    public List<BorrowRequest> getByBorrower(@PathVariable String email) {
        return borrowRequestRepository.findByBorrowerEmail(email);
    }

    // GET: Get all requests for an owner
    @GetMapping("/owner/{email}")
    public List<BorrowRequest> getByOwner(@PathVariable String email) {
        return borrowRequestRepository.findByOwnerEmail(email);
    }

    // PUT: Update request status (Accept/Reject)
    @PutMapping("/{id}/status")
    public BorrowRequest updateStatus(@PathVariable Long id, @RequestBody String status) {
        BorrowRequest req = borrowRequestRepository.findById(id).orElse(null);
        if (req != null) {
            req.setStatus(status.replace("\"", "")); // remove quotes from JSON string
            return borrowRequestRepository.save(req);
        }
        return null;
    }
}
