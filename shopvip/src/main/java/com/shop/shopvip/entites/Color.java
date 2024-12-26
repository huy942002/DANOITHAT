package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the colors database table.
 *
 */
@SuppressWarnings("serial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Color implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name="COLOR_NAME", nullable = false)
    private String colorName;

    @Column(name = "IMG", length = 255)
    private String img;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    @JsonIgnore
    @OneToMany(mappedBy="color")
    private Set<ColorDetail> colorDetails;

    @JsonIgnore
    @OneToMany(mappedBy="color")
    private Set<DetailsInvoice> detailsInvoices;

}
