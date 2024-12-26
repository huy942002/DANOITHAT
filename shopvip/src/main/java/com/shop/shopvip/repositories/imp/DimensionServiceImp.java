package com.shop.shopvip.repositories.imp;


import com.shop.shopvip.entites.Dimension;
import com.shop.shopvip.repositories.irepo.DimensionService;
import com.shop.shopvip.repositories.repo.DimensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class DimensionServiceImp implements DimensionService {
    @Autowired
    DimensionRepository dao;

    @Override
    public List<Dimension> findAll() {
        return dao.findAll();
    }

    @Override
    public Dimension findById(Integer id) {
        return dao.findById(id).get();
    }

    @Override
    public Dimension create(Dimension dimension) {
        return dao.save(dimension);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
