package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.DimensionsDetail;
import com.shop.shopvip.repositories.irepo.DimensionDetailService;
import com.shop.shopvip.repositories.repo.DimensionDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class DimensionDetailServiceImp implements DimensionDetailService {
    @Autowired
    DimensionDetailRepository dao;

    @Override
    public List<DimensionsDetail> findAll() {
        return dao.findAll();
    }

    @Override
    public DimensionsDetail create(DimensionsDetail dimensionsDetail) {
        return dao.save(dimensionsDetail);
    }

    @Override
    public Optional<DimensionsDetail> findById(Integer id) {
        return dao.findById(id);
    }

    @Override
    public List<DimensionsDetail> findByProductId(Integer id) {
        return dao.findDimensionDetailByProductId(id);
    }

    @Override
    public DimensionsDetail update(DimensionsDetail dimensionsDetail) {
        return dao.save(dimensionsDetail);
    }

//    @Override
//    public List<DimensionsDetail> findByProductId(Integer id) {
//        return dao.findByProductId(id);
//    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
