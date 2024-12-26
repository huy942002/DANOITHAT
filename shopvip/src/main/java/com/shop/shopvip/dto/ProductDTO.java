package com.shop.shopvip.dto;

import com.shop.shopvip.entites.ColorDetail;
import com.shop.shopvip.entites.DimensionsDetail;
import com.shop.shopvip.entites.Product;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Data
public class ProductDTO {
    private Product product;
    private List<ColorDetail> colorDetailList;
    private List<DimensionsDetail> dimensionsDetailList;
}
