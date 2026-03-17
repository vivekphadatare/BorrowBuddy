package com.borrowbuddy.borrowbuddy.model;

import jakarta.persistence.*;

@Entity
@Table(name = "borrow_requests")
public class BorrowRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;
    private String borrowerEmail;
    private String ownerEmail;
    private String status;  // values: Pending, Accepted, Rejected

    public BorrowRequest() {}

    public BorrowRequest(Long itemId, String borrowerEmail, String ownerEmail, String status) {
        this.itemId = itemId;
        this.borrowerEmail = borrowerEmail;
        this.ownerEmail = ownerEmail;
        this.status = status;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public String getBorrowerEmail() { return borrowerEmail; }
    public void setBorrowerEmail(String borrowerEmail) { this.borrowerEmail = borrowerEmail; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
