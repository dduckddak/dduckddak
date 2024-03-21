package com.ssafy.back.makebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.back.entity.MakeBookEntity;

@Repository
public interface MakeBookRepository extends JpaRepository<MakeBookEntity, Integer> {

}
