package com.shop.shopvip.entites;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
/**
 * The persistent class for the orderdetail database table.
 *
 */
@SuppressWarnings("serial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class DetailsInvoice implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "PRICES")
    private double prices;

    @ManyToOne
    @JoinColumn(name="ORDER_ID")
    private Bills order;

    @ManyToOne
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    private int quantity;

    @ManyToOne
    @JoinColumn(name="DIMENSION_ID")
    private Dimension dimension;

    @ManyToOne
    @JoinColumn(name="COLOR_ID")
    private Color color;

}
