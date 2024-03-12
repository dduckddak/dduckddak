import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { books } from './MainCharacterScreen';
import { useNavigation } from '@react-navigation/native';

type DetailBookScreenRouteProp = {
  params: {
    bookId: string;
  };
};

type DetailBookScreenProps = {
  route: DetailBookScreenRouteProp;
};

function DetailBookScreen({ route }: DetailBookScreenProps) {
  const navigation = useNavigation();
  const bookid = route.params.bookId;
  const selectedBook = books.find((book) => book.id === parseInt(bookid));

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>이런책이에요 !</Text>
      <View style={styles.contentContainer}>
        <View style={styles.bookDetails}>
          <Text style={styles.detailText}>
            표지 : {selectedBook?.coverName}
          </Text>
          <Text style={styles.detailText}>제목 : {selectedBook?.title}</Text>
          <Text style={styles.detailText}>저자 : {selectedBook?.author}</Text>
          <Text style={styles.detailText}>
            줄거리 : {selectedBook?.synopsis}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontFamily: 'im-hyemin-bold',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 30,
    fontFamily: 'im-hyemin',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bookDetails: {
    flex: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(65, 152, 7, 0.5)', // 테두리 색상
    backgroundColor: 'rgba(65, 152, 7, 0.5)', // 배경색
    shadowColor: 'rgba(65, 152, 7, 0.5)', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0, // 그림자 투명도
    shadowRadius: 1, // 그림자 반경
    elevation: 1, // 안드로이드 그림자
    margin: 10,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: 333,
    height: 210,
    marginTop: 10,
  },
});

export default DetailBookScreen;
