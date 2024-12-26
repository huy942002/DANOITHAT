package com.shop.shopvip.restController;

import com.shop.shopvip.entites.ColorDetail;
import com.shop.shopvip.repositories.irepo.ColorDetailService;
import com.shop.shopvip.repositories.repo.ColorDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ColorDetailRestController {

    @Autowired
    ColorDetailRepository repository;

    @Autowired
    ColorDetailService service;

    @GetMapping("/admin/product/colorDetail/{id}")
    public ResponseEntity<Iterable<ColorDetail>> getColorDetailByProductId(@PathVariable Integer id){
        return new ResponseEntity<>(repository.findByProductId(id), HttpStatus.OK);
    }

    @PostMapping("/admin/colorDetail")
    public ResponseEntity<ColorDetail> create(@RequestBody ColorDetail colorDetail){
        ColorDetail c = new ColorDetail();
        c.setColor(colorDetail.getColor());
        c.setProduct(colorDetail.getProduct());
        c.setStatus(1);
        return new ResponseEntity<>(service.create(c),HttpStatus.OK);
    }

}
