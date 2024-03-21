package com.ssafy.back.makebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.MakeBookEntity;
import com.ssafy.back.makebook.dto.MakeBookSummaryDto;

@Repository
public interface MakeBookRepository extends JpaRepository<MakeBookEntity, Integer> {
	@Query(
		"select new com.ssafy.back.makebook.dto.MakeBookSummaryDto(m.makeBookId, m.makeBookTitle) from MakeBookEntity m "
			+ "where m.userEntity.userSeq= :userSeq")
	List<MakeBookSummaryDto> findSummaryByUserSeq(int userSeq);
}
