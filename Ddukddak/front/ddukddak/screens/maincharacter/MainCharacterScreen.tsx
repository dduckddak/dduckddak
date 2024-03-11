import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const books = [
  'Book Title 1',
  'Book Title 2',
  'Book Title 3',
  'Book Title 4',
  'Book Title 5',
  'Book Title 6',
  'Book Title 7',
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

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.flexContainer}>
        <View style={styles.container}>
          <Button title="<" onPress={previousPage} />
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('detail')}>
              <View style={styles.box}>
                <Text style={styles.text}>{books[currentPage]}</Text>
              </View>
            </TouchableOpacity>
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
