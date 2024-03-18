package com.ssafy.back.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.entity.ReviewEntity;
import com.ssafy.back.voice.dto.VoiceDto;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
	@Query("select new com.ssafy.back.book.dto.ReviewDto(r.bookId, r.isLike) from ReviewEntity r where r.userEntity.userSeq=:userSeq")
	List<ReviewDto> findByUserEntity_UserSeq(Integer userSeq);
}
