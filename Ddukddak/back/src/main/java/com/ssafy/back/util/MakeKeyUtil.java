package com.ssafy.back.util;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MakeKeyUtil {
	//voiceId를 이용한 미리듣기 음성 키 제작
	public static String voice(int voiceId) {
		return "vo" + voiceId;
	}

	//photoId 이용한 사진 키 제작
	public static String photo(int photoId) {
		return "ph" + photoId;
	}

	//coloringId 이용한 사진 키 제작
	public static String coloring(int coloringId) {
		return "co" + coloringId;
	}

	//bookId와 페이지 순서를 이용한 페이지 키 제작 ( 얼굴 빈 칸 유무 )
	public static String page(int bookId, int pegSeq, boolean face) {
		String str = face?"":"blank";
		return "df" + bookId + "p" + pegSeq + str;
	}
}
