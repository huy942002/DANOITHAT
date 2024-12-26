package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {

    @Query("Select u from Users u where u.username =:username")
    Users findByUserName(@Param("username") String username);
}
