package com.ssafy.back.voice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.VoiceEntity;
import com.ssafy.back.voice.dto.VoiceDto;

@Repository
public interface VoiceRepository extends JpaRepository<VoiceEntity, Integer> {
	@Query("select new com.ssafy.back.voice.dto.VoiceDto(v.voiceId, v.voiceName) from VoiceEntity v where v.userEntity.userSeq=:userSeq")
	List<VoiceDto> findByUserEntity_UserSeq(Integer userSeq);

	@Modifying
	@Query("delete from VoiceEntity v where v.voiceId in :ids")
	int deleteAllById(@Param("ids") List<Integer> ids);

	@Query("SELECT v.voiceModelId FROM VoiceEntity v WHERE v.voiceId = :voiceId")
	String findVoiceModelIdByVoiceId(@Param("voiceId") Integer voiceId);
}
