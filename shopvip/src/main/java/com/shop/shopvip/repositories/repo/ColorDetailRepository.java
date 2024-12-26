package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.ColorDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ColorDetailRepository extends JpaRepository<ColorDetail, Integer> {
    @Query("SELECT c FROM ColorDetail c WHERE c.product.id=?1")
    List<ColorDetail> findByProductId(Integer id);
}
