package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.DimensionsDetail;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public interface DimensionDetailService {
    public List<DimensionsDetail> findAll() ;

    public DimensionsDetail create(DimensionsDetail dimensionsDetail) ;

    public Optional<DimensionsDetail> findById(Integer id) ;

    public List<DimensionsDetail> findByProductId(Integer id);

    public DimensionsDetail update(DimensionsDetail dimensionsDetail);

    public void delete(Integer id) ;
}
