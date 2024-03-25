import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Colors } from '../../components/Ui/styles';
import GreenButton from '../../components/GreenButton';

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
  { id: 3, title: '책 3' },
  { id: 4, title: '책 4' },
  { id: 5, title: '책 5' },
  { id: 6, title: '책 6' },
  { id: 7, title: '책 7' },
  { id: 8, title: '책 8' },
  { id: 9, title: '책 9' },
  { id: 10, title: '책 10' },
];

const BookSelectionScreen = () => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const toggleSelection = (bookId: number) => {
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

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={[
        styles.bookItem,
        selectedBooks.includes(item.id) && styles.selected,
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.liketext}> 💚 마음에 드는 책을 골라주세요 💚 </Text>
        <View style={{ height: 20 }}></View>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.flatListContent}
        />
        <GreenButton
          content="선택완료"
          onPress={goToNextStep}
          style={styles.green}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 5,
  },
  liketext: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    marginTop: 20,
  },
  flatListContent: {
    alignItems: 'center',
    // margin: 10,
  },
  bookItem: {
    margin: 10,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.22,
    height: 300,
    justifyContent: 'center',
  },
  bookTitle: {
    textAlign: 'center',
    position: 'absolute', // 책 이름을 책 아래에 위치시키기 위해 절대 위치로 설정
    bottom: -35,
    fontFamily: 'im-hyemin-bold',
    fontSize: 25,
  },
  selected: {
    borderColor: Colors.green,
    borderWidth: 4,
  },
  green: {
    margin: 20,
    width: Dimensions.get('window').width * 0.15,
    alignSelf: 'center',
  },
});

export default BookSelectionScreen;
