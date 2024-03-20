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

}
