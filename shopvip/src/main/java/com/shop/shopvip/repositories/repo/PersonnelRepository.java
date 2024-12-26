/**
 * 
 */
package com.shop.shopvip.repositories.repo;

import com.shop.shopvip.entites.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer>{
//    @Query("select p from Personnel p where p.users.username = :userName")
//    Personnel getPersonnelByUserName(@Param("userName") String userName);
}
