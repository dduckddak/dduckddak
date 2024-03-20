package com.ssafy.back.coloring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.coloring.dto.ColoringDto;
import com.ssafy.back.entity.ColoringEntity;

@Repository
public interface ColoringRepository extends JpaRepository<ColoringEntity, Integer> {
	@Query("select new com.ssafy.back.coloring.dto.ColoringDto(c.coloringId) from ColoringEntity c where c.userEntity.userSeq=:userSeq")
	List<ColoringDto> findByUserEntity_UserSeq(Integer userSeq);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query("delete from ColoringEntity c where c.coloringId in :ids")
	void deleteAllById(@Param("ids") List<Integer> ids);
}
