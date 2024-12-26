package com.shop.shopvip.repositories.repo;


import com.shop.shopvip.entites.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
