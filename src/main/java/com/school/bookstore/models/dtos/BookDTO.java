package com.school.bookstore.models.dtos;

import com.school.bookstore.models.entities.Language;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;


    @Size(min = 2, message = "{validation.title.size.too_short}")
    @Size(max = 200, message = "{validation.title.size.too_long}")
    @NotBlank(message = "Field must not be blank")
    private String title;

    @NotEmpty(message = "Author list must not be blank")
    private List<String> authorNameList;

    @NotEmpty(message = "Tag list must not be blank")
    private List<String> genreTagList;

    @NotBlank(message = "Publisher must not be blank")
    @Size(min = 2, message = "{validation.publisher.size.too_short}")
    @Size(max = 200, message = "{validation.publisher.size.too_long}")
    private String publisher;

    @Size(min = 5, message = "{validation.description.size.too_short}")
    @Size(max = 5000, message = "{validation.description.size.too_long}")
    private int yearPublished;

    private String description;

    private Language language;

    private int numPages;


    private double priceBeforeDiscount;

    private int discountPercent;

    private int copiesAvailable;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private String imageLink;
}
