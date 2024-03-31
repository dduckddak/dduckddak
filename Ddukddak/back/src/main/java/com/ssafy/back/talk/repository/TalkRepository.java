package com.ssafy.back.talk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.PersonEntity;
import com.ssafy.back.talk.dto.StartTalkDto;

@Repository
public interface TalkRepository extends JpaRepository<PersonEntity, Integer> {
	@Query("select new com.ssafy.back.talk.dto.StartTalkDto(p.personName, p.welcomeComment) from PersonEntity p where p.bookEntity.bookId=:bookId")
	StartTalkDto findPersonName_bookId(@Param("bookId") Integer bookId);

	@Query("select p.voiceModelId from PersonEntity p where p.bookEntity.bookId=:bookId")
	String findVoiceModelId_bookId(@Param("bookId") Integer bookId);
}
