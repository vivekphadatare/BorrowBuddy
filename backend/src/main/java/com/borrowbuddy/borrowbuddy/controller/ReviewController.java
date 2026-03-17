package com.borrowbuddy.borrowbuddy.controller;

import com.borrowbuddy.borrowbuddy.model.Review;
import com.borrowbuddy.borrowbuddy.model.BorrowRequest;
import com.borrowbuddy.borrowbuddy.repository.ReviewRepository;
import com.borrowbuddy.borrowbuddy.repository.BorrowRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BorrowRequestRepository requestRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitReview(@RequestBody Review review) {
        reviewRepository.save(review);

        // Mark borrow request as returned
        Optional<BorrowRequest> request = requestRepository.findById(review.getRequestId());
        request.ifPresent(r -> {
            r.setStatus("Returned");
            requestRepository.save(r);
        });

        return ResponseEntity.ok("Review submitted and item marked as returned.");
    }

    // ✅ New API to get all reviews for a given item
    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Review>> getReviewsForItem(@PathVariable Long itemId) {
        List<Review> reviews = reviewRepository.findByItemId(itemId);
        return ResponseEntity.ok(reviews);
    }
}
