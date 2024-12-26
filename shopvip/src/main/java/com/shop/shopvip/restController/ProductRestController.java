package com.shop.shopvip.restController;

import com.shop.shopvip.dto.ProductDTO;
import com.shop.shopvip.entites.ColorDetail;
import com.shop.shopvip.entites.DimensionsDetail;
import com.shop.shopvip.entites.Product;
import com.shop.shopvip.repositories.irepo.ColorDetailService;
import com.shop.shopvip.repositories.irepo.DimensionDetailService;
import com.shop.shopvip.repositories.irepo.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductRestController {
    @Autowired
    ProductService repository;

    @Autowired
    ColorDetailService colorDetailService;

    @Autowired
    DimensionDetailService dimensionDetailService;

    @GetMapping("/admin/product")
    public ResponseEntity<Iterable<Product>> getAll(){
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/admin/product/{id}")
    public ResponseEntity<Product> getAll(@PathVariable Integer id){
        Optional<Product> optionalProduct = repository.findById(id);
        return optionalProduct.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/admin/product")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO){
        repository.create(productDTO.getProduct());
        List<Product> products = repository.findAll();
        Product productObj = products.get(products.size()-1);
        List<ColorDetail> colorDetailList = productDTO.getColorDetailList();
        for (ColorDetail colorDetail : colorDetailList) {
            ColorDetail colorDetail1 = new ColorDetail();
            colorDetail1.setProduct(productObj);
            colorDetail1.setColor(colorDetail.getColor());
            colorDetail1.setStatus(1);
            colorDetailService.create(colorDetail1);
        }
        List<DimensionsDetail> dimensionsDetailList = productDTO.getDimensionsDetailList();
        for (DimensionsDetail dimensionsDetail : dimensionsDetailList) {
            DimensionsDetail dimensionsDetail1 = new DimensionsDetail();
            dimensionsDetail1.setProduct(productObj);
            dimensionsDetail1.setDimension(dimensionsDetail.getDimension());
            dimensionsDetail1.setPrice(dimensionsDetail.getPrice());
            dimensionDetailService.create(dimensionsDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/admin/product/{id}")
    public ResponseEntity<Product> Update(@RequestBody Product product,@PathVariable Integer id){
        Optional<Product> productOptional = repository.findById(id);
        return productOptional.map(p -> {
            product.setId(p.getId());
            return new ResponseEntity<>(repository.update(product), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
