package com.ssafy.back.entity.compositeKey;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class PageId implements Serializable {

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

    @Column(name = "page_seq", nullable = false)
    private Integer pageSeq;

}