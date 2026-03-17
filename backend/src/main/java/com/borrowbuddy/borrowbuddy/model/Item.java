package com.borrowbuddy.borrowbuddy.model;

import jakarta.persistence.*;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String description;
    private String category;
    private String ownerEmail;
    private String location;
    private Double price; // e.g. 50.0
    private String rateType;      // "per hour" or "per day"

    public Item() {}

    public Item(String itemName, String description, String category, String ownerEmail, String location, double price, String rateType) {
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.ownerEmail = ownerEmail;
        this.location = location;
        this.price = price;
        this.rateType = rateType;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getRateType() { return rateType; }
    public void setRateType(String rateType) { this.rateType = rateType; }
}
