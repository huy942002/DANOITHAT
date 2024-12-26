package com.shop.shopvip.repositories.irepo;

import com.shop.shopvip.entites.Color;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public interface ColorService {
    public List<Color> findAll() ;

    public Optional<Color> findById(Integer id);
    public Color create(Color color) ;

    public Color update(Color color) ;

    public void delete(Integer id) ;
}
