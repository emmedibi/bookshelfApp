package com.firstreactjavaapp.bookshelfApp.repository;

import com.firstreactjavaapp.bookshelfApp.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

    Optional<Book> findById(String id);
}
