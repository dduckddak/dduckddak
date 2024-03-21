package com.ssafy.back.makebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.ScriptEntity;
import com.ssafy.back.makebook.dto.ScriptDto;

@Repository
public interface ScriptRepository extends JpaRepository<ScriptEntity, Integer> {
	@Query("select COUNT(s) from ScriptEntity s where s.scriptId.bookId = :bookId and s.scriptId.pageSeq = :pageSeq")
	int findScriptCount(@Param("bookId") Integer bookId, @Param("pageSeq") Integer pageSeq);

	@Query("select new com.ssafy.back.makebook.dto.ScriptDto(s.role, s.scriptContent) from ScriptEntity s "
		+ "where s.scriptId.bookId = :bookId and s.scriptId.pageSeq = :pageSeq and s.scriptId.scriptSeq=:scriptSeq")
	ScriptDto findByScriptId(@Param("bookId") Integer bookId, @Param("pageSeq") Integer pageSeq,
		@Param("scriptSeq") Integer scriptSeq);
}
