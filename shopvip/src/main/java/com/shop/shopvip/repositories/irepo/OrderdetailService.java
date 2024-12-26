package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.DetailsInvoice;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public interface OrderdetailService {
    public List<DetailsInvoice> findAll() ;

    public DetailsInvoice findById(Integer id) ;

    public List<DetailsInvoice> findByorderId(int orderId) ;

    public DetailsInvoice create(DetailsInvoice orderdetail) ;

    public DetailsInvoice update(DetailsInvoice orderdetail) ;

    public void delete(Integer id) ;
}
