package com.shop.shopvip.restController;

import com.shop.shopvip.entites.Material;
import com.shop.shopvip.repositories.irepo.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MaterialRestController {
    @Autowired
    MaterialService repository;

    @GetMapping("/admin/material")
    public ResponseEntity<Iterable<Material>> getAll(){
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }
}
