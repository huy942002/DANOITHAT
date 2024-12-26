package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.Product;
import com.shop.shopvip.repositories.irepo.ProductService;
import com.shop.shopvip.repositories.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository dao;


    @Override
    public List<Product> findAll() {
        return dao.findAll();
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return dao.findById(id);
    }

    @Override
    public List<Product> findByProductCategoryId(int productCategoryid) {
        return null;
    }

    @Override
    public Product create(Product product) {
        return dao.save(product);
    }

    @Override
    public Product update(Product product) {
        return dao.save(product);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
