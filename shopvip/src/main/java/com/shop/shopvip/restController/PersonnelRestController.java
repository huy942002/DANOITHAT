package com.shop.shopvip.restController;

import com.shop.shopvip.entites.Personnel;
import com.shop.shopvip.repositories.irepo.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PersonnelRestController {
    @Autowired
    PersonnelService repository;

    @GetMapping("/admin/personnel")
    public ResponseEntity<Iterable<Personnel>> getAllPersonnel() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    // add new
    @PostMapping("/adminuser/personnel")
    public ResponseEntity<Personnel> createNewPersonnel(@RequestBody Personnel personnel) {
        Personnel p = personnel;
        p.getUsers().setPassword(BCrypt.hashpw(personnel.getUsers().getPassword(), BCrypt.gensalt()));;
        return new ResponseEntity<>(repository.save(p), HttpStatus.OK);
    }

    // getById
    @GetMapping("/adminuser/personnel/{id}")
    public ResponseEntity<Personnel> getPersonnel(@PathVariable Integer id) {
        Optional<Personnel> personnelOptional = repository.findById(id);
        return personnelOptional.map(personnel -> new ResponseEntity<>(personnel, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // update
    @PutMapping("/adminuser/personnel/{id}")
    public ResponseEntity<Personnel> updatePersonnel(@PathVariable Integer id, @RequestBody Personnel personnel) {
        Optional<Personnel> personnelOptional = repository.findById(id);
        return personnelOptional.map(p -> {
            personnel.setId(p.getId());
            return new ResponseEntity<>(repository.save(personnel), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // delete
    @DeleteMapping("/admin/personnel/{id}")
    public ResponseEntity<Personnel> deletePersonnel(@PathVariable Integer id) {
        Optional<Personnel> personnelOptional = repository.findById(id);
        return personnelOptional.map(p -> {
            repository.remove(id);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
