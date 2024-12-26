package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Set;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "NAME", length = 255)
    private String name;

    @Column(name = "IMG", length = 255)
    private String img;

    @Column(name = "IMG1", length = 255)
    private String img1;

    @Column(name = "IMG2", length = 255)
    private String img2;

    @Column(name = "IMG3", length = 255)
    private String img3;

//    @Column(name = "ANNOTATE", length = 255)
    private String annotate;

    //bi-directional many-to-one association to Material
    @ManyToOne
    @JoinColumn(name="material_id")
    private Material materials;

    //bi-directional many-to-one association to ProductCategory
    @ManyToOne
    @JoinColumn(name="product_category_id")
    private Category category;

    private int status;

    //bi-directional many-to-one association to ColorDetail
    @OneToMany(mappedBy="product")
    @JsonIgnore
    private Set<ColorDetail> colorDetails;

    //bi-directional many-to-one association to DimensionsDetail
    @OneToMany(mappedBy="product")
    @JsonIgnore
    private Set<DimensionsDetail> dimensionsDetails;

}
