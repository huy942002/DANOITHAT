package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Set;

/**
 * The persistent class for the dimensions database table.
 *
 */
@SuppressWarnings("serial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Dimension implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "SIZE", nullable = false)
    private String size;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    @OneToMany(mappedBy = "dimension")
    @JsonIgnore
    private Set<DetailsInvoice> detailsInvoices;

    @OneToMany(mappedBy = "dimension")
    @JsonIgnore
    private Set<DimensionsDetail> dimensionsDetails;


}
