package com.borrowbuddy.borrowbuddy.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;
    private Long requestId; // ✅ Needed to link to the borrow request
    private String reviewerEmail;
    private String comments;
    private int rating;

    // Constructors
    public Review() {}

    public Review(Long itemId, Long requestId, String reviewerEmail, String comments, int rating) {
        this.itemId = itemId;
        this.requestId = requestId;
        this.reviewerEmail = reviewerEmail;
        this.comments = comments;
        this.rating = rating;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public String getReviewerEmail() { return reviewerEmail; }
    public void setReviewerEmail(String reviewerEmail) { this.reviewerEmail = reviewerEmail; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
