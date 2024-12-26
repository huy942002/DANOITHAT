package com.shop.shopvip.repositories.imp;


import com.shop.shopvip.entites.Color;
import com.shop.shopvip.repositories.irepo.ColorService;
import com.shop.shopvip.repositories.repo.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImp implements ColorService {
    @Autowired
    ColorRepository dao;

    @Override
    public List<Color> findAll() {
        return dao.findAll();
    }

    @Override
    public Optional<Color> findById(Integer id) {
        return dao.findById(id);
    }

    @Override
    public Color create(Color color) {
        return dao.save(color);
    }

    @Override
    public Color update(Color color) {
        return dao.save(color);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
    }
}
