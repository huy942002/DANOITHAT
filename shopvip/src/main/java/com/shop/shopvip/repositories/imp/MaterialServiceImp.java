package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.Material;
import com.shop.shopvip.repositories.irepo.MaterialService;
import com.shop.shopvip.repositories.repo.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class MaterialServiceImp implements MaterialService {
    @Autowired
    MaterialRepository dao;
    @Override
    public List<Material> findAll() {
        return dao.findAll();
    }

    @Override
    public Material create(Material material) {
        return dao.save(material);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
