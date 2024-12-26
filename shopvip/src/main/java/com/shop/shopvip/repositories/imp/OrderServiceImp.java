package com.shop.shopvip.repositories.imp;



import com.shop.shopvip.entites.Bills;
import com.shop.shopvip.repositories.irepo.OrderService;
import com.shop.shopvip.repositories.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderRepository dao;

    @Override
    public List<Bills> findAll() {
        return dao.findAll();
    }

    @Override
    public Bills findById(Integer id) {
        return dao.findById(id).get();
    }

    @Override
    public List<Bills> findByOrdersdt(String sdt) {
        return null;
    }

    @Override
    public Bills create(Bills order) {
        return dao.save(order);
    }

    @Override
    public Bills update(Bills order) {
        return dao.save(order);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
