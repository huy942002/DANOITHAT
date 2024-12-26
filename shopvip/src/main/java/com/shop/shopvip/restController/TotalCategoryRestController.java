package com.shop.shopvip.restController;

import com.shop.shopvip.entites.TotalCategory;
import com.shop.shopvip.repositories.irepo.TotalCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TotalCategoryRestController  {
    @Autowired
    TotalCategoryService repository;

    @GetMapping("/admin/total-category")
    public ResponseEntity<Iterable<TotalCategory>> getAll(){
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }
}
