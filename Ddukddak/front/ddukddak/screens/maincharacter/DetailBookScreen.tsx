import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import { books } from './MainCharacterScreen';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detail'
>;

interface DetailBookScreenProps {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
}
function DetailBookScreen({ route, navigation }: DetailBookScreenProps) {
  const bookid = route.params.bookId;
  const selectedBook = books.find((book) => book.id === parseInt(bookid));

  return (
    <ImageBackground
      source={require('../../assets/images/detailbookbackground.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>이런책이에요 !</Text>
        <View style={styles.contentContainer}>
          <View style={styles.bookDetails}>
            <View style={styles.imageContainer}>
              <Image
                source={selectedBook?.coverImage}
                style={styles.coverImage}
              />
              <View style={styles.buttonsContainer}>
                <Button title="좋아요" />
                <Button title="싫어요" />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                제목 : {selectedBook?.title}
              </Text>
              <Text style={styles.detailText}>
                저자 : {selectedBook?.author}
              </Text>
              <Text style={styles.detailText}>
                줄거리 : {selectedBook?.synopsis}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('fairy' as never)}
            >
              <Image
                source={require('../../assets/images/donghwabutton.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('talk' as never)}
            >
              <Image
                source={require('../../assets/images/talkbutton.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontFamily: 'im-hyemin-bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  detailText: {
    fontSize: 40,
    fontFamily: 'im-hyemin',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  bookDetails: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(65, 152, 7, 0.5)',
    backgroundColor: 'rgba(65, 152, 7, 0.5)',
    shadowColor: 'rgba(65, 152, 7, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  image: {
    width: 333,
    height: 210,
    marginTop: 10,
  },
  coverImage: {
    width: '80%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default DetailBookScreen;
