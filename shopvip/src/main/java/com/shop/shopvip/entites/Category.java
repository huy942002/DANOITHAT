package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name="NAME", nullable = false)
    private String name;

    //bi-directional many-to-one association to Product
    @JsonIgnore
    @OneToMany(mappedBy="category")
    private Set<Product> product;

    @ManyToOne(optional = false)
    @JoinColumn(name="total_category_id", nullable = false)
    private TotalCategory totalCategory;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;
}
