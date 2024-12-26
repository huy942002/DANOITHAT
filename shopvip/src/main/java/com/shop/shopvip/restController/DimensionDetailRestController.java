package com.shop.shopvip.restController;

import com.shop.shopvip.entites.DimensionsDetail;
import com.shop.shopvip.repositories.irepo.DimensionDetailService;
import com.shop.shopvip.repositories.repo.DimensionDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api")
public class DimensionDetailRestController {

    @Autowired
    DimensionDetailRepository repository;

    @Autowired
    DimensionDetailService service;

    @GetMapping("/admin/product/dimensionDetail/{id}")
    public ResponseEntity<Iterable<DimensionsDetail>> getColorDetailByProductId(@PathVariable Integer id){
        return new ResponseEntity<>(repository.findDimensionDetailByProductId(id), HttpStatus.OK);
    }

    @PostMapping("/admin/dimensionDetail")
    public ResponseEntity<DimensionsDetail> createNewDimensionDetail(@RequestBody DimensionsDetail dimensionsDetail){
        DimensionsDetail dimensionsDetail1 = new DimensionsDetail();
        dimensionsDetail1.setDimension(dimensionsDetail.getDimension());
        dimensionsDetail1.setPrice(dimensionsDetail.getPrice());
        dimensionsDetail1.setProduct(dimensionsDetail.getProduct());
        return new ResponseEntity<>(service.create(dimensionsDetail1),HttpStatus.OK);
    }

    @PutMapping("/admin/dimensionDetail/{id}")
    public ResponseEntity<DimensionsDetail> update(@PathVariable Integer id,@RequestBody DimensionsDetail dimensionsDetail){
        Optional<DimensionsDetail> dimensionsDetail1 = service.findById(id);
        return dimensionsDetail1.map(c -> {
            dimensionsDetail.setId(c.getId());
            return new ResponseEntity<>(service.update(dimensionsDetail), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
