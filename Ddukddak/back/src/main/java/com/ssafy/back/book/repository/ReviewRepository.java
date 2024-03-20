package com.ssafy.back.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
	@Query("select new com.ssafy.back.book.dto.ReviewDto(r.bookEntity.bookId, r.isLike) from ReviewEntity r where r.userEntity.userSeq = :userSeq")
	List<ReviewDto> findByUserEntity_UserSeq(Integer userSeq);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO review (book_id, user_seq, is_like) VALUES (:bookId, :userSeq, :isLike)", nativeQuery = true)
	void insertReviewNative(@Param("bookId") Integer bookId, @Param("userSeq") Integer userSeq,
		@Param("isLike") Boolean isLike);

	// @Transactional
	// ReviewEntity findById(ReviewId reviewId);

	@Modifying
	@Transactional
	@Query(value = "UPDATE review SET is_like = :isLike WHERE book_id = :bookId AND user_seq = :userSeq", nativeQuery = true)
	int updateReviewNative(@Param("bookId") Integer bookId, @Param("userSeq") Integer userSeq,
		@Param("isLike") Boolean isLike);
}
