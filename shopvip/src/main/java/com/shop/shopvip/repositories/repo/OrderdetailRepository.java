package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.DetailsInvoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderdetailRepository extends JpaRepository<DetailsInvoice, Integer> {
//    @Query("SELECT o FROM Orderdetail o WHERE o.order.id = ?1")
//    List<DetailsInvoice> findByorderId(Integer id);
}
