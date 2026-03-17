package com.borrowbuddy.borrowbuddy.controller;

import com.borrowbuddy.borrowbuddy.model.Item;
import com.borrowbuddy.borrowbuddy.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // Add item
    @PostMapping("/add")
    public Item addItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    // Get all items
    @GetMapping("/all")
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
