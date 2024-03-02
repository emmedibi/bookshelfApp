package com.firstreactjavaapp.bookshelfApp.service;

import com.firstreactjavaapp.bookshelfApp.entity.Book;
import com.firstreactjavaapp.bookshelfApp.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.firstreactjavaapp.bookshelfApp.constant.Costant.COVER_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class BookService {

    @Autowired
    BookRepository bookRepository;

    /**
     * Get all the books stored in db, sorted by Title and divided by page.
     * @param page
     * @param size
     * @return
     */
    public Page<Book> getAllBooks(int page, int size) {
        log.info("Get all the books");
        return bookRepository.findAll(PageRequest.of(page, size, Sort.by("title")));
    }

    public Book getBook(String id){
        log.info("Get a book");
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book createBook(Book book){
        log.info("Save Book");
        return bookRepository.save(book);
    }

    public String uploadCover(String id, MultipartFile file){
        Book book = getBook(id);
        String coverUrl = coverFunction.apply(id, file);
        book.setCoverUrl(coverUrl);
        bookRepository.save(book);
        return coverUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> coverFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(COVER_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectories((fileStorageLocation));
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING );
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/books/image/" + filename).toUriString();
        } catch (Exception exception){
            // generic error message
            throw new RuntimeException("Unable to save the image");
        }
    };
}
