package com.firstreactjavaapp.bookshelfApp.controller;

import com.firstreactjavaapp.bookshelfApp.entity.Book;
import com.firstreactjavaapp.bookshelfApp.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.firstreactjavaapp.bookshelfApp.constant.Costant.COVER_DIRECTORY;
import static org.springframework.util.MimeTypeUtils.*;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book){
        return ResponseEntity.created(URI.create("/books/bookID")).body(bookService.createBook(book));
    }

    @GetMapping
    public ResponseEntity<Page<Book>> getBooks(@RequestParam(value="page", defaultValue= "0") int page,
                                               @RequestParam(value="size", defaultValue = "10") int size){
        return ResponseEntity.ok().body(bookService.getAllBooks(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBooks(@PathVariable(value="id") String id){
        return ResponseEntity.ok().body(bookService.getBook(id));
    }

    @PutMapping("/cover")
    public ResponseEntity<String> uploadCover(@RequestParam("id") String id, @RequestParam("file")MultipartFile file){
        return ResponseEntity.ok().body(bookService.uploadCover(id, file));
    }

    @GetMapping(path="/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getCover(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(COVER_DIRECTORY + filename));
    }
}
