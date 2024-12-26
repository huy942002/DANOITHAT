package com.shop.shopvip.restController;

import com.shop.shopvip.entites.Category;
import com.shop.shopvip.entites.Color;
import com.shop.shopvip.repositories.irepo.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ColorRestController {

    @Autowired
    ColorService repository;

    @GetMapping("/admin/color")
    public ResponseEntity<Iterable<Color>> getAll(){
        return new ResponseEntity(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/admin/color/{id}")
    public ResponseEntity<Color> getById(@PathVariable Integer id){
        Optional<Color> optionalColor = repository.findById(id);
        return optionalColor.map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/admin/color")
    public ResponseEntity<Color> createNewCategory(@RequestBody Color color){
        return new ResponseEntity<>(repository.create(color),HttpStatus.OK);
    }
    @PutMapping("/admin/color/{id}")
    public ResponseEntity<Color> UpdateCategory(@PathVariable Integer id,@RequestBody Color color) {
        Optional<Color> optionalColor = repository.findById(id);
        return optionalColor.map(c -> {
            color.setId(c.getId());
            return new ResponseEntity<>(repository.update(color), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
