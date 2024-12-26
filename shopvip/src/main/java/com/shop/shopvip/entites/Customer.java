package com.shop.shopvip.entites;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "FULLNAME", nullable = false, length = 255)
    private String fullname;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "GENDER", length = 5)
    private String gender;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "ADDRESS", length = 255)
    private String address;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;

    @OneToMany(mappedBy = "customers")
    @JsonIgnore
    private Set<Bills> bills;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USER")
    private Users users;

}

