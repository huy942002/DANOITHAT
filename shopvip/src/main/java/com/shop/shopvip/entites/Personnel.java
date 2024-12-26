package com.shop.shopvip.entites;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Personnel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "FULLNAME", nullable = false, length = 255)
    private String fullname;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "CITIZEN_ID_CODE", length = 12)
    private String citizenIdCode;

    @Column(name = "GENDER", length = 5)
    private String gender;

    @Column(name = "DATE_OF_BIRTH")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "ADDRESS", length = 255)
    private String address;

    @Column(name = "IMG", length = 255)
    private String img;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USER")
    private Users users;

}
