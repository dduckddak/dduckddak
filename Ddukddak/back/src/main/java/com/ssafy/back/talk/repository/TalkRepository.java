package com.ssafy.back.talk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.PersonEntity;

@Repository
public interface TalkRepository extends JpaRepository<PersonEntity, Integer> {
	@Query("select p.personName from PersonEntity p where p.bookEntity.bookId=:bookId and p.personId.isMain = false")
	String findPersonName_bookId(@Param("bookId") Integer bookId);

	@Query("select p.voiceModelId from PersonEntity p where p.bookEntity.bookId=:bookId and p.personId.isMain = false")
	String findVoiceModelId_bookId(@Param("bookId") Integer bookId);
}
