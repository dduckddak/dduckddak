package com.ssafy.back.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.back.book.dto.BookSummarylDto;
import com.ssafy.back.entity.BookEntity;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
	@Query("SELECT new com.ssafy.back.book.dto.BookDetailDto(b.bookId, b.bookTitle) FROM BookEntity b WHERE b.bookId IN :bookIds")
	List<BookSummarylDto> findAllById(@Param("bookIds") List<Integer> bookIds);
}


