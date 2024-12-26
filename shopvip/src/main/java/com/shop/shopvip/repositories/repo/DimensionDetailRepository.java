package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.DimensionsDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface DimensionDetailRepository extends JpaRepository<DimensionsDetail, Integer> {
    @Query("SELECT d FROM DimensionsDetail d WHERE d.product.id=?1")
    List<DimensionsDetail> findDimensionDetailByProductId(Integer id);

    @Query("SELECT MIN(d.price) FROM DimensionsDetail d WHERE d.product.id=?1")
    public Double findByProductMINId(Integer id);

    @Query("SELECT MAX(d.price) FROM DimensionsDetail d WHERE d.product.id=?1")
    public Double findByProductMAXId(Integer id);

    @Query("SELECT d FROM DimensionsDetail d WHERE d.product.id =?1 AND  d.dimension.id = ?2")
    DimensionsDetail findByProductAndDimension(Integer id1, Integer id2);
}
