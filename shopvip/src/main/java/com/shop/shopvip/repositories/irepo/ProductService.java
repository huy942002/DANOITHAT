package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.Product;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    public List<Product> findAll() ;

    public Optional<Product> findById(Integer id) ;

    public List<Product> findByProductCategoryId(int productCategoryid) ;

    public Product create(Product product) ;

    public Product update(Product product) ;

    public void delete(Integer id) ;
}
