package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.ColorDetail;
import com.shop.shopvip.repositories.irepo.ColorDetailService;
import com.shop.shopvip.repositories.repo.ColorDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class ColorDetailServiceImp implements ColorDetailService {

    @Autowired
    ColorDetailRepository dao;

    @Override
    public List<ColorDetail> findAll() {
        return dao.findAll();
    }

    @Override
    public List<ColorDetail> findByProductId(Integer id) {
        return dao.findByProductId(id);
    }

    @Override
    public ColorDetail create(ColorDetail colorDetail) {
        return dao.save(colorDetail);
    }

    @Override
    public void delete(Integer id) {
    dao.deleteById(id);
    }
}
