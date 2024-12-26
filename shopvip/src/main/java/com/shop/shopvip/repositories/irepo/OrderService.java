package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.Bills;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface OrderService {
    public List<Bills> findAll() ;

    public Bills findById(Integer id) ;

    public List<Bills> findByOrdersdt(String sdt) ;

    public Bills create(Bills order) ;

    public Bills update(Bills order) ;

    public void delete(Integer id) ;
}
