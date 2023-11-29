package com.school.bookstore.controllers;

import com.school.bookstore.models.dtos.BookDTO;
import com.school.bookstore.services.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Tag(name = "Books API", description = "Endpoints for managing books")
@Validated
@RequestMapping("/api/books")
@RestController
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.createBook(bookDTO));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("filtered/")
    public ResponseEntity<List<BookDTO>> getFilteredBooks(@RequestParam String title, @RequestParam String authorName,
                                                          @RequestParam String genre, @RequestParam String language,
                                                          @RequestParam String publisher) {
        return ResponseEntity.ok(bookService.getFilteredBooks(title, authorName, genre, language, publisher));
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long bookId, @RequestBody @Valid BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.updateBook(bookId, bookDTO));
    }

    @DeleteMapping("/{bookId}")
    public HttpStatus deleteBook(@PathVariable Long id) {
        bookService.deleteBookById(id);
        return HttpStatus.NO_CONTENT;
    }

    @PatchMapping("/{bookId}/cover")
    public ResponseEntity<BookDTO> addBookCoverImage(@PathVariable Long bookId, @RequestBody MultipartFile file) {
        if(file.isEmpty()) {
            ResponseEntity.badRequest();
        }
        return ResponseEntity.ok(bookService.changeBookCoverImage(bookId, file));
    }
}
