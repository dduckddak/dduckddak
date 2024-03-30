import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  Animated,
  Image,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getBookList } from '../../api/bookApi';

import { BookSummary } from '../../types/types';
import BookList from './childs/BookList';
import Dots from './childs/Dots';
import { useUserStore } from '../../store/userStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
  navigation,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookList, setBookList] = useState<BookSummary[]>([]);
  // 구름 두둥실
  const CloudAnimation = ({ children }: { children: React.ReactNode }) => {
    const [cloudAnimationValue] = useState(new Animated.Value(0));

    useEffect(() => {
      const animateClouds = () => {
        const cloudAnimation = Animated.sequence([
          Animated.timing(cloudAnimationValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(cloudAnimationValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]);

        Animated.loop(cloudAnimation).start();
      };
      animateClouds();
      return () => {};
    }, [cloudAnimationValue]);
    const cloud1TranslateY = cloudAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 45,
          left: 50,
          width: 200,
          height: 130,
          transform: [{ translateY: cloud1TranslateY }],
        }}
      >
        {children}
      </Animated.View>
    );
  };
  const userSex = useUserStore((state) => state.sex);
  const [mainPageCharacter, setMainPageCharacter] = useState();

  useEffect(() => {
    const updateMainImage = () => {
      if (userSex === 'M') {
        setMainPageCharacter(require('../../assets/images/DD/뚝이3.png'));
      } else {
        setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
      }
    };

    const fetchBooks = async () => {
      try {
        const books = await getBookList();

        if (books.bookList) {
          setBookList(books.bookList);
        }
        // setBookList(tempBookData.bookList);
      } catch (error) {
        console.error('Failed:', error);
      }
    };
    // 여기 accept imcomming 하면 되겠지 ??
    updateMainImage();
    console.log(bookList);
    fetchBooks();
  }, []);

  const nextPage = () => {
    setCurrentPage(
      (prevCurrentPage) => (prevCurrentPage + 1) % bookList.length,
    );
  };

  const previousPage = () => {
    setCurrentPage(
      (prevCurrentPage) =>
        (prevCurrentPage + bookList.length - 1) % bookList.length,
    );
  };

  const goToDetail = (bookSummary: BookSummary | undefined) => {
    navigation.navigate('detail', bookSummary);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/background3.png')}
      style={styles.imageBackground}
    >
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
      </CloudAnimation>

      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <Text style={styles.howabout}>이 책 어때요??</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* 1(공백) : 4(책 목록)  1(도트컨테이너)로 flex 분배 해놓음*/}
        <View style={styles.flexContainer}>
          <View
            style={{
              flex: 1,
            }}
          />
          <BookList
            bookList={bookList}
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
            goToDetail={goToDetail}
            navigation={navigation}
          />
          <Dots bookList={bookList} currentPage={currentPage} />
        </View>
      </TouchableWithoutFeedback>
      <Image source={mainPageCharacter} style={styles.ddak2} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cloud: { position: 'absolute', top: 45, left: 130 },
  // cloud1: { position: 'absolute', top: 30, left: 400, width: 220, height: 140 },
  cloud2: {
    position: 'absolute',
    top: 150,
    left: -30,
    width: 200,
    height: 130,
    transform: [{ scaleX: -1 }],
  },
  cloud3: { position: 'absolute', top: 5, left: 950, width: 160, height: 130 },
  howabout: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 65,
    alignSelf: 'center',
    paddingTop: 50,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    // borderWidth: 1,
  },
  ddak2: {
    position: 'absolute',
    right: '3%',
    top: '75%',
    width: '12%',
    height: '22%',
  },
});

export default MainCharacterScreen;
