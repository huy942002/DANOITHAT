package com.shop.shopvip.repositories.imp;


import com.shop.shopvip.entites.MaterialCategory;
import com.shop.shopvip.repositories.irepo.MaterialCategoryService;
import com.shop.shopvip.repositories.repo.MaterialCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MaterialCategoryServiceImp implements MaterialCategoryService {
    @Autowired
    MaterialCategoryRepository dao;

    @Override
    public List<MaterialCategory> findAll() {
        return dao.findAll();
    }

    @Override
    public MaterialCategory create(MaterialCategory materialCategory) {
        return dao.save(materialCategory);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
