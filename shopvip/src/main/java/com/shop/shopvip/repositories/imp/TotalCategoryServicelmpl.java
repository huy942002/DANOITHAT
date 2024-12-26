package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.TotalCategory;
import com.shop.shopvip.repositories.irepo.TotalCategoryService;
import com.shop.shopvip.repositories.repo.TotalCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TotalCategoryServicelmpl implements TotalCategoryService {
    @Autowired
    TotalCategoryRepository totalCategoryDAO;

    @Override
    public List<TotalCategory> findAll() {
        return totalCategoryDAO.findAll();
    }

    @Override
    public TotalCategory create(TotalCategory totalCategory) {
        return totalCategoryDAO.save(totalCategory);
    }

    @Override
    public TotalCategory findById(Integer id) {
        return totalCategoryDAO.findById(id).get();
    }

    @Override
    public void delete(Integer id) {
        totalCategoryDAO.deleteById(id);
    }
}
