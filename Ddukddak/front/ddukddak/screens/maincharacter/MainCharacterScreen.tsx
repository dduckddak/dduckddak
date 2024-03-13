import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const books = [
  {
    id: 1,
    coverName: 'cover-book-title-1.jpg',
    title: 'Book Title 1',
    author: 'Author Name 1',
    synopsis: 'This is the synopsis of Book Title 1. It talks about...',
  },
  {
    id: 2,
    coverName: 'cover-book-title-2.jpg',
    title: 'Book Title 2',
    author: 'Author Name 2',
    synopsis:
      'This is the synopsis of Book Title 2. It explores the concept of...',
  },
  {
    id: 3,
    coverName: 'cover-book-title-3.jpg',
    title: 'Book Title 3',
    author: 'Author Name 3',
    synopsis:
      'This is the synopsis of Book Title 3. The story revolves around...',
  },
  {
    id: 4,
    coverName: 'cover-book-title-4.jpg',
    title: 'Book Title 4',
    author: 'Author Name 4',
    synopsis:
      'This is the synopsis of Book Title 4. It delves into the life of...',
  },
  {
    id: 5,
    coverName: 'cover-book-title-5.jpg',
    title: 'Book Title 5',
    author: 'Author Name 5',
    synopsis:
      'This is the synopsis of Book Title 5. A tale of adventure and...',
  },
  {
    id: 6,
    coverName: 'cover-book-title-6.jpg',
    title: 'Book Title 6',
    author: 'Author Name 6',
    synopsis: 'This is the synopsis of Book Title 6. Exploring themes of...',
  },
  {
    id: 7,
    coverName: 'cover-book-title-7.jpg',
    title: 'Book Title 7',
    author: 'Author Name 7',
    synopsis:
      'This is the synopsis of Book Title 7. A gripping narrative about...',
  },
];

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
  navigation,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => (prevCurrentPage + 1) % books.length);
  };

  const previousPage = () => {
    setCurrentPage(
      (prevCurrentPage) => (prevCurrentPage - 1 + books.length) % books.length,
    );
  };

  const goToDetail = (id: number) => {
    navigation.navigate('detail', { bookId: id });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.flexContainer}>
        <View style={styles.container}>
          <Button title="<" onPress={previousPage} />
          <View style={styles.textContainer}>
            <Pressable onPress={() => goToDetail(books[currentPage].id)}>
              <View style={styles.box}>
                <Text style={styles.text}>{books[currentPage].title}</Text>
              </View>
            </Pressable>
          </View>
          <Button title=">" onPress={nextPage} />
        </View>
        <View style={styles.dotsContainer}>
          {books.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
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
  flexContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'im-hyemin',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    paddingTop: '90%',
    paddingLeft: '125%',
  },
  dot: {
    width: 35,
    height: 35,
    borderRadius: 30,
    margin: 20,
  },
  activeDot: {
    backgroundColor: '#254E5A',
  },
  inactiveDot: {
    backgroundColor: '#B3DABF',
  },
});

export default MainCharacterScreen;
