/**
 * 
 */
package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 *
 * @author trucnv
 *
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("select entity from Customer entity  Where users.id in (select id from Users where username =:username)")
    public Optional<Customer> getCutomer(@Param("username") String username);
}
