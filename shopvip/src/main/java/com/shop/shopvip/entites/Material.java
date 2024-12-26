package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;


import java.io.Serializable;
import java.util.Set;

/**
 * The persistent class for the materials database table.
 *
 */
@SuppressWarnings("serial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Material implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name="NAME")
    private String name;

    private double price;

    //bi-directional many-to-one association to MaterialCategory
    @ManyToOne
    @JoinColumn(name="material_category_id")
    private MaterialCategory materialCategory;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    //bi-directional many-to-one association to Product
    @JsonIgnore
    @OneToMany(mappedBy="materials")
    private Set<Product> products;
}
