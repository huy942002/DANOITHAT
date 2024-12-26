package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.Category;
import com.shop.shopvip.repositories.irepo.CategoryService;
import com.shop.shopvip.repositories.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ProductCategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository dao;

    @Override
    public List<Category> findAll() {
        return dao.findAll();
    }

    @Override
    public Optional<Category> findById(Integer id) {
        return dao.findById(id);
    }

    @Override
    public Category create(Category productCategory) {
        return dao.save(productCategory);
    }

    @Override
    public Category update(Category productCategory) {
        return dao.save(productCategory);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
