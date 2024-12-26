package com.shop.shopvip.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Favourite implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_CUSTOMER", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name="PRODUCT_ID")
    private Product product;
}
