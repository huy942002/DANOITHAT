package com.shop.shopvip.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class DimensionsDetail implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "PRICE")
    private double price;

    @ManyToOne(optional = false)
    @JoinColumn(name="PRODUCT_ID", nullable = false)
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name="DIMENSION_ID", nullable = false)
    private Dimension dimension;
}
