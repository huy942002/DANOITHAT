package com.shop.shopvip.repositories.repo;


import com.shop.shopvip.entites.Bills;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Bills, Integer> {
}
