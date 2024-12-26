package com.shop.shopvip.repositories.imp;

import com.shop.shopvip.entites.DetailsInvoice;
import com.shop.shopvip.repositories.irepo.OrderdetailService;
import com.shop.shopvip.repositories.repo.OrderdetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




import java.util.List;
@Service
public class OrderdetailServiceImp implements OrderdetailService {
    @Autowired
    OrderdetailRepository dao;
    @Override
    public List<DetailsInvoice> findAll() {
        return dao.findAll();
    }

    @Override
    public DetailsInvoice findById(Integer id) {
        return dao.findById(id).get();
    }

    @Override
    public List<DetailsInvoice> findByorderId(int orderId) {
//        return dao.findByorderId(orderId);
        return null;
    }

    @Override
    public DetailsInvoice create(DetailsInvoice orderdetail) {
        return dao.save(orderdetail);
    }

    @Override
    public DetailsInvoice update(DetailsInvoice orderdetail) {
        return dao.save(orderdetail);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
