package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.TotalCategory;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public interface TotalCategoryService {
    public List<TotalCategory> findAll() ;

    public TotalCategory create(TotalCategory totalCategory) ;

    public TotalCategory findById(Integer id);

    public void delete(Integer id) ;
}
