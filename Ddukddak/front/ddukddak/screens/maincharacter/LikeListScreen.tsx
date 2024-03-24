import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { getLikeList, BookListData } from '../../api/bookApi';

function LikeListScreen() {
  // 좋아요한 책 리스트를 저장할 상태
  const [likeList, setLikeList] = useState<BookListData[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const LikeList = async () => {
      setIsLoading(true);
      try {
        const response = await getLikeList();
        setLikeList(response.bookList as BookListData[]);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed:', error);
        setErrorMessage('좋아요한 책 리스트를 가져오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    LikeList();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>좋아요한 책 목록</Text>
    </View>
  );
}

export default LikeListScreen;
