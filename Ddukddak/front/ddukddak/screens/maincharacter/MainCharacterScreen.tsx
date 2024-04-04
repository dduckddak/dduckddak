import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getBookList } from '../../api/bookApi';
import { useFocusEffect } from '@react-navigation/native';
import { BookSummary } from '../../types/types';
import BookList from './childs/BookList';
import Dots from './childs/Dots';
import { useUserStore } from '../../store/userStore';
import useTimeStore from '../../store/timeStore';
import useTouchEffect from '../../components/sound/TouchEffect';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

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
    return () => {
    };
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

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
                                                                   navigation,
                                                                 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookList, setBookList] = useState<BookSummary[]>([]);
  const { playTouch } = useTouchEffect();

  // 구름 두둥실

  const userSex = useUserStore((state) => state.sex);
  const { fontColor, backgroundSrc } = useTimeStore();

  const [mainPageCharacter, setMainPageCharacter] = useState();

  const updateMainImage = useCallback(() => {
    if (userSex === 'M') {
      setMainPageCharacter(require('../../assets/images/DD/뚝이3.png'));
    } else {
      setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
    }
  }, [userSex]);

  const fetchBooks = useCallback(async () => {
    try {
      const books = await getBookList();
      if (books.bookList) {
        setBookList(books.bookList);
      }
    } catch (error) {
      console.error('Failed:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      updateMainImage();
      fetchBooks();
    }, [updateMainImage, fetchBooks]),
  );

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
      // source={require('../../assets/images/background/morning.jpg')}
      source={backgroundSrc}
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
      <Text style={[styles.howabout, { color: fontColor }]}>이 책 어때요??</Text>

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
      {mainPageCharacter && (
        <TouchableOpacity
          onPress={() => {
            playTouch(userSex);
          }}
          style={styles.ddak2}
        >
          <Image
            source={mainPageCharacter}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cloud: { position: 'absolute', top: -20, left: 200, width: 130, height: 150 },
  cloud2: {
    position: 'absolute',
    top: 150,
    left: -30,
    width: 130,
    height: 150,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: 5,
    left: 850,
    width: 130,
    height: 150,
  },
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
