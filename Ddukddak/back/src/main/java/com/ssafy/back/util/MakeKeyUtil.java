package com.ssafy.back.util;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MakeKeyUtil {
	//voiceId를 이용한 미리듣기 음성 키 제작
	public static String voice(int voiceId) {
		return "vo" + voiceId;
	}

	//photoId 이용한 사진 키 제작
	public static String photo(int userSeq, int photoId) {
		return userSeq + "/photo" + "/original/" + photoId;
	}

	//coloringId 이용한 사진 키 제작
	public static String coloring(int userSeq, int coloringId) {
		return userSeq + "/coloring/" + coloringId;
	}

	//bookId 를 이용한 동화책 그림 키 제작
	public static String page(int bookId, int pageSeq, boolean isFace) {
		return "default-book/" + bookId + (isFace ? "/nonblank/" : "/blank/") + pageSeq;
	}

}
