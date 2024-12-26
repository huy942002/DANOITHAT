package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.Category;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public interface CategoryService {
    public List<Category> findAll() ;

    public Optional<Category> findById(Integer id) ;

    public Category create(Category productCategory) ;

    public Category update(Category productCategory) ;

    public void delete(Integer id) ;
}
