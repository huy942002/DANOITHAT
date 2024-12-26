package com.shop.shopvip.restController;

import com.shop.shopvip.entites.Dimension;
import com.shop.shopvip.repositories.irepo.DimensionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dimension")
public class DimensionRestController {
    @Autowired
    DimensionService repository;

    @GetMapping
    public ResponseEntity<Iterable<Dimension>> getAllDimension(){
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }
}
