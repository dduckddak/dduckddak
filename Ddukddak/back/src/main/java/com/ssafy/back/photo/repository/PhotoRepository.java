package com.ssafy.back.photo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.PhotoEntity;
import com.ssafy.back.entity.UserEntity;
import com.ssafy.back.photo.dto.PhotoDto;
import com.ssafy.back.voice.dto.VoiceDto;

@Repository
public interface PhotoRepository extends JpaRepository<PhotoEntity, Integer> {
	List<PhotoEntity> findByUserEntity(UserEntity userEntity);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query("delete from PhotoEntity p where p.photoId in :ids")
	void deleteAllById(@Param("ids") List<Integer> ids);
}
