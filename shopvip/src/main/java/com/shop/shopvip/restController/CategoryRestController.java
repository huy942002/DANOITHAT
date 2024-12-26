package com.shop.shopvip.restController;

import com.shop.shopvip.entites.Category;
import com.shop.shopvip.repositories.irepo.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryRestController {

    @Autowired
    CategoryService repository;

    @GetMapping("/admin/category")
    public ResponseEntity<Iterable<Category>> getAll(){
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/admin/category/{id}")
    public ResponseEntity<Category> getById(@PathVariable Integer id){
        Optional<Category> optionalCategory = repository.findById(id);
        return optionalCategory.map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createNewCategory(@RequestBody Category category){
        return new ResponseEntity<>(repository.create(category),HttpStatus.OK);
    }

    @PutMapping("/admin/category/{id}")
    public ResponseEntity<Category> UpdateCategory(@PathVariable Integer id,@RequestBody Category category) {
        Optional<Category> optionalCategory = repository.findById(id);
        return optionalCategory.map(c -> {
            category.setId(c.getId());
            return new ResponseEntity<>(repository.update(category), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
