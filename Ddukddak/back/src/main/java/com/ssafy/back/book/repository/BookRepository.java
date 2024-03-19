package com.ssafy.back.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.ssafy.back.book.dto.BookDetailDto;
import com.ssafy.back.book.dto.BookSummaryDto;
import com.ssafy.back.entity.BookEntity;


@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
	@Query("SELECT new com.ssafy.back.book.dto.BookSummaryDto(b.bookId, b.bookTitle) FROM BookEntity b WHERE b.bookId IN :bookIds")
	List<BookSummaryDto> findAllById(@Param("bookIds") List<Integer> bookIds);

	@Query("SELECT new com.ssafy.back.book.dto.BookSummaryDto(b.bookId, b.bookTitle) FROM BookEntity b WHERE b.bookTitle LIKE %:keyword%")
	List<BookSummaryDto>  findByTitleContains(@Param("keyword") String keyword);

	@Query("SELECT new com.ssafy.back.book.dto.BookDetailDto(b.bookAuthor, b.bookStory, r.isLike) " +
		"FROM BookEntity b LEFT JOIN ReviewEntity r ON r.bookEntity.bookId = b.bookId AND r.userEntity.userSeq = :userSeq " +
		"WHERE b.bookId = :bookId")
	BookDetailDto findBookDetailByBookIdAndUserSeq(@Param("bookId") Integer bookId, @Param("userSeq") Integer userSeq);
}


