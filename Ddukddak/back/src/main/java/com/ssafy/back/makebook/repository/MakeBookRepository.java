package com.ssafy.back.makebook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.MakeBookEntity;
import com.ssafy.back.makebook.dto.MakeBookSummaryDto;

@Repository
public interface MakeBookRepository extends JpaRepository<MakeBookEntity, Integer> {
	@Query(
		"select new com.ssafy.back.makebook.dto.MakeBookSummaryDto(m.makeBookId, m.makeBookTitle) from MakeBookEntity m "
			+ "where m.userEntity.userSeq= :userSeq")
	List<MakeBookSummaryDto> findSummaryByUserSeq(int userSeq);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query("delete from MakeBookEntity m where m.makeBookId in :ids")
	void deleteAllById(@Param("ids") List<Integer> ids);
}
