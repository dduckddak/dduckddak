package com.ssafy.back.book.controller;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.book.dto.request.ChoiceBookListRequestDto;
import com.ssafy.back.book.dto.request.CreateReviewRequestDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.ChoiceBookResponseDto;
import com.ssafy.back.book.dto.response.ListBookChoiceResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;
import com.ssafy.back.book.dto.response.ReviewResponseDto;
import com.ssafy.back.book.service.BookService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/books", produces = "application/json; charset=UTF8")
@Tag(name = "book", description = "책 API")
public class BookController {
	private final BookService bookService;

	@Operation(
		summary = "책 추천 목록",
		description = "사용자의 책 추천 목록을 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListBookRecommendResponseDto.class))),
	})
	@GetMapping("/list")
	public ResponseEntity<? super ListBookRecommendResponseDto> listBook() {
		return bookService.listBookRecommend();
	}

	@Operation(
		summary = "책 검색 목록",
		description = "검색 키워드를 포함한 책 제목을 가진 리스트를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListBookSearchResponseDto.class))),
	})
	@GetMapping("/search/{keyword}")
	public ResponseEntity<? super ListBookSearchResponseDto> searchBook(@PathVariable String keyword) {
		return bookService.listBookSearch(keyword);
	}

	@Operation(
		summary = "책 상세",
		description = "책의 저자, 내용, 리뷰 정보를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = BookDetailResponseDto.class))),
	})
	@GetMapping("/{bookId}")
	public ResponseEntity<? super BookDetailResponseDto> bookDetail(@PathVariable Integer bookId) {
		return bookService.bookDetail(bookId);
	}

	@Operation(
		summary = "좋아요한 책 목록",
		description = "사용자가 좋아요를 누른 책 목록을 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = BookDetailResponseDto.class))),
	})
	@GetMapping("/like")
	public ResponseEntity<? super ListBookLikeResponseDto> listBookLike() {
		return bookService.listBookLike();
	}

	@Operation(
		summary = "리뷰",
		description = "리뷰가 있다면 생성하거나 수정하고 없다면 삭제한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ReviewResponseDto.class))),
	})
	@PostMapping("/reviews")
	public ResponseEntity<? super ReviewResponseDto> createReview(@RequestBody CreateReviewRequestDto request) {
		return bookService.createReview(request);
	}

	@Operation(
		summary = "선호도 조사 책 목록",
		description = "첫 로그인시 사용자의 선호도를 조사할 책 목록을 불러온다. "
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListBookChoiceResponseDto.class))),
	})
	@GetMapping("/choice-list")
	public ResponseEntity<? super ListBookChoiceResponseDto> choiceList(){
		return bookService.listBookChoice();
	}

	@Operation(
		summary = "선호도 조사 책 목록 선택",
		description = "선택해 온 책 목록에 좋아요 리뷰를 생성한다. "
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ChoiceBookResponseDto.class))),
	})
	@PostMapping("/choice-list")
	public ResponseEntity<? super ChoiceBookResponseDto> createChoiceList(@RequestBody ChoiceBookListRequestDto requestDto){
		return bookService.choiceBook(requestDto);
	}
}
