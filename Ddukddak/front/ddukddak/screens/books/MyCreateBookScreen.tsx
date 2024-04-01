import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../components/Ui/styles';

import {
  deleteMakeBook,
  getMakeBookList,
  MakeBookListData,
} from '../../api/makeBookApi';
import EmptyListComponent from '../../components/EmptyListComponent';
import useTouchEffect from '../../components/sound/TouchEffect';

interface BookItemsProps {
  title: string;
  coverImage: string;
  makeBookId: number;
  isDeleteMode: boolean;
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  navigation: any;
  toggleDeleteMode: () => void;
}

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CloudAnimation = ({ children }: { children: React.ReactNode }) => {
  const cloudAnimationValue = useState(new Animated.Value(0))[0];

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
    return () => { };
  }, [cloudAnimationValue]);

  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: screenHeight * 0.05,
        left: screenWidth * 0.005,
        width: screenWidth * 0.2,
        height: screenHeight * 0.2,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

const BookItems: React.FC<BookItemsProps> = ({
  title,
  coverImage,
  makeBookId,
  isDeleteMode,
  selectedItems,
  setSelectedItems,
  navigation,
  toggleDeleteMode,
}) => {
  const CharrrrAnimation = useRef(new Animated.Value(1)).current;
  const { playTouch } = useTouchEffect();

  useEffect(() => {
    console.log(isDeleteMode);
    return () => {
      CharrrrAnimation.removeAllListeners();
    };
  }, []);

  const isSelected = selectedItems.includes(makeBookId);

  const handleSelectItem = () => {
    console.log('Long press detected');
    if (isDeleteMode) {
      // 삭제 모드일 때의 로직
      const newSelectedItems = isSelected
        ? selectedItems.filter((id) => id !== makeBookId)
        : [...selectedItems, makeBookId];
      setSelectedItems(newSelectedItems);
    }
  };

  const handlePress = () => {
    playTouch('open');
    CharrrrAnimation.setValue(1);

    setTimeout(() => {
      CharrrrAnimation.stopAnimation();
    }, 1000);

    Animated.timing(CharrrrAnimation, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      CharrrrAnimation.setValue(1);
      navigation.navigate('makingBook', { makeBookId: makeBookId });
    });
  };

  return (
    <TouchableOpacity
      style={styles.bookItem}
      onLongPress={toggleDeleteMode} // 길게 누를 때 실행
      onPress={() => {
        if (isDeleteMode) {
          handleSelectItem();
        } else {
          handlePress();
        }
      }}
    >
      <View
        style={[
          styles.bookContainer,
          isSelected && isDeleteMode ? styles.selectedItem : {},
        ]}
      >
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BookListScreen: React.FC = () => {
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);
  const [makeBookList, setMakeBookList] = useState<MakeBookListData>();
  const { playTouch } = useTouchEffect();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const fetchMakeBooks = async () => {
    try {
      const makeBooksResponse = await getMakeBookList();
      setMakeBookList(makeBooksResponse);
      console.log('API Response : ', makeBooksResponse);
    } catch (error) {
      console.log('에러!', error);
    }
  };

  useEffect(() => {
    fetchMakeBooks();
  }, []);

  const test = async (makeBookIds: number[]) => {
    try {
      const response = await deleteMakeBook(makeBookIds);
      console.log(response);
      setIsDeleteMode(false);
      setSelectedItems([]);
      fetchMakeBooks();
    } catch (error: any) {
      console.error('Error deleting:', error.message);
      // Alert.alert('삭제 실패', '목소리 삭제 중 오류가 발생했습니다.');
      // setFAlertModal(true);
    }
  };

  // const handleDeleteItems = async () => {
  //   console.log(selectedItems);
  //   try {
  //     const response = await deleteMakeBook(selectedItems);
  //     console.log(response);
  //     setIsDeleteMode(false);
  //     setSelectedItems([]);
  //     fetchMakeBooks();
  //   } catch (error) {
  //     console.error('Failed to delete items', error);
  //     Alert.alert('Error', 'Failed to delete books');
  //   }
  // };

  const navigation = useNavigation();

  const duckPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [shouldFlip, setShouldFlip] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(duckPosition, {
          toValue: { x: screenWidth * 0.1, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(duckPosition, {
          toValue: { x: 2, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  //오리 반전
  duckPosition.x.addListener((value) => {
    // 움직임이 끝에 도달했을 때 반전
    if (value.value == screenWidth * 0.1) {
      setShouldFlip(true);
    }
    if (value.value == 0) {
      setShouldFlip(false);
    }
  });


  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
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
          style={styles.cloud1}
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
      <TouchableOpacity
        onPress={() => playTouch('duck')}
        style={[
          styles.duck,
          {
            transform: [
              { translateX: duckPosition.x },
              { translateY: duckPosition.y },
              { scaleX: shouldFlip ? -1 : 1 }
            ],
          },
        ]}
      >
        <Animated.Image
          source={require('../../assets/images/duck.png')}
          style={styles.duckImage}
        />
      </TouchableOpacity>
      <View>
        <FlatList
          ListEmptyComponent={<EmptyListComponent />}
          data={makeBookList?.makeBookList}
          renderItem={({ item }) => (
            <BookItems
              title={item.makeBookTitle}
              coverImage={item.makeBookCover}
              makeBookId={item.makeBookId}
              isDeleteMode={isDeleteMode}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              navigation={navigation}
              toggleDeleteMode={toggleDeleteMode}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.bookList}
        />
      </View>
      <TouchableOpacity
        style={styles.trash}
        onPress={() => test(selectedItems)}
      >
        <Image
          source={require('../../assets/images/Trash.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  bookList: {
    alignItems: 'center',
    paddingTop: 90,
  },
  cloud: {
    position: 'absolute',
    top: screenHeight * 0.005,
    left: screenWidth * 0.15,
  },
  cloud1: {
    position: 'absolute',
    top: screenHeight * 0.03,
    left: screenWidth * 0.35,
    width: screenWidth * 0.17,
    height: screenHeight * 0.2,
  },
  cloud2: {
    position: 'absolute',
    top: screenHeight * 0.005,
    left: screenWidth * 0.71,
    width: screenWidth * 0.1,
    height: screenHeight * 0.17,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: screenHeight * 0.15,
    left: screenWidth * 0.88,
  },
  duck: {
    position: 'absolute',
    bottom: screenHeight * 0.15,
    left: screenWidth * 0.04,
    width: screenWidth * 0.09,
    height: screenHeight * 0.1,
    zIndex: 1,
  },
  bookItem: {
    marginHorizontal: screenWidth * 0.048,
    marginTop: screenHeight * 0.04,
    alignItems: 'center',
  },
  coverImage: {
    width: Dimensions.get('screen').width * 0.35,
    height: Dimensions.get('screen').height * 0.56,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'black',
    zIndex: 20,
  },
  title: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 45,
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  trash: {
    position: 'absolute',
    width: 90,
    height: 90,
    left: '92%',
    top: '86%',
    elevation: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: '92.5%',
    top: '96%',
  },
  bookContainer: {},
  selectedItem: {
    borderWidth: 3,
    // borderColor: 'blue',
  },

  duckImage: {
    width: '100%',
    height: '100%',
  },
});
