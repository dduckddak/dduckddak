import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';

interface Book {
  id: number;
  title: string;
}
type Props = {
  navigation: NavigationProp<any>;
};
const books: Book[] = [
  { id: 1, title: '책 1' },
  { id: 2, title: '책 2' },
];
const handlePress = () => {
  console.log('버튼누름!');
  navigation.navigate('likebooks');
};
const BookSelectionScreen = () => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]); // 타입 명시

  const toggleSelection = (bookId: number) => {
    // 파라미터 타입 명시
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const goToNextStep = () => {
    if (selectedBooks.length > 0) {
      console.log('Selected Books: ', selectedBooks);
    } else {
      alert('적어도 1개 이상의 책을 선택해야 합니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={[
            styles.bookItem,
            selectedBooks.includes(book.id) && styles.selected,
          ]}
          onPress={() => toggleSelection(book.id)}
        >
          <Text>{book.title}</Text>
        </TouchableOpacity>
      ))}
      <Button title="다음" onPress={goToNextStep} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  bookItem: {
    margin: 10,
    padding: 20,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: 'blue',
  },
});

export default BookSelectionScreen;
