package com.firstreactjavaapp.bookshelfApp.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name="book")
public class Book {
    @Id
    @UuidGenerator
    @Column(name="id", unique= true, updatable=false)
    private String id;
    private String title;
    private String author;
    private int pages;
    private String plot;
    private String coverUrl;
}
