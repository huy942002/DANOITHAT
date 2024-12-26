package com.shop.shopvip.entites;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.experimental.SuperBuilder;

import java.util.Set;

/**
 * The persistent class for the material_category database table.
 *
 */
@SuppressWarnings("serial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class MaterialCategory implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name="MATERIAL_CATEGORY_NAME")
    private String name;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    //bi-directional many-to-one association to Material
    @JsonIgnore
    @OneToMany(mappedBy="materialCategory")
    private Set<Material> materials;


}
