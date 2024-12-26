package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.Personnel;
import com.shop.shopvip.repositories.irepo.PersonnelService;
import com.shop.shopvip.repositories.repo.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonnelServiceImp implements PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepo;

    @Override
    public Iterable<Personnel> findAll() {
        return personnelRepo.findAll();
    }

    @Override
    public Optional<Personnel> findById(Integer id) {
        return personnelRepo.findById(id);
    }

    @Override
    public Personnel save(Personnel t) {
        return personnelRepo.save(t);
    }

    @Override
    public void remove(Integer id) {
        personnelRepo.deleteById(id);
    }

}
