package com.shop.shopvip.entites;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Bills implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "CREATE_DATE", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDate;

    @Column(name = "TOTAL_CASH")
    private double totalCash;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_CUSTOMER", nullable = false)
    private Customer customer;

    @Column(name = "NOTE", nullable = false, length = 255)
    private String note;

    @ManyToOne
    @JoinColumn(name="CUSTOMER_ID")
    private Customer customers;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

}
