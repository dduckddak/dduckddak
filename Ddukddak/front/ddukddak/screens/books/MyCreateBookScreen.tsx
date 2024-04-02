import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions, Pressable, TouchableOpacity,
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
    <Pressable

      style={({ pressed }) => [
        styles.bookItem,
        { opacity: pressed ? 0.3 : 1 }
      ]}
      onPress={() => {
        if (isDeleteMode) {
          handleSelectItem();
        } else {
          handlePress();
        }
      }}
    >
      <View style={styles.bookContainer}>
        <Image
          source={{ uri: coverImage }}
          style={[styles.coverImage, isSelected && styles.selectedBook]}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};
const BookListScreen: React.FC = () => {
  const [makeBookList, setMakeBookList] = useState<MakeBookListData>();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);

  const { playTouch } = useTouchEffect();

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
  const handleTrashButton = async () => {
    // delete Mode 가 아니거나 delete Mode 인데 선택된게 없으면 deleteMode 토글
    if (!isDeleteMode || (isDeleteMode && selectedItems.length === 0)) {
      toggleDeleteMode();
      return;
    }
    try {
      console.log(selectedItems);
      const response = await deleteMakeBook(selectedItems);
      console.log(response);
      setIsDeleteMode(false);
      setSelectedItems([]);
      await fetchMakeBooks();
    } catch (error: any) {
      console.error('Error deleting:', error.message);
    }
  };
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
              { scaleX: shouldFlip ? -1 : 1 },
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
      <Pressable
        onPress={handleTrashButton}
        style={({ pressed }) => [
          styles.trash,
          {
            opacity: pressed ? .3 : 1,
          },

        ]}
      >
        <Image
          source={require('../../assets/images/Trash.png')}
          style={[
            { width: '100%', height: '100%' },
            isDeleteMode && styles.deleteModeTrashCan,
          ]}
        />
      </Pressable>
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
    top: 5,
    left: 100,
  },
  cloud1: {
    position: 'absolute',
    top: 5,
    left: 350,
    width: 200,
    height: 130,
  },
  cloud2: {
    position: 'absolute',
    top: 5,
    left: 700,
    width: 120,
    height: 100,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: 65,
    left: 1000,
  },
  duck: {
    position: 'absolute',
    bottom: 110,
    left: 60,
    width: 110,
    height: 75,
    zIndex: 1,
  },
  bookItem: {
    marginHorizontal: 58,
    marginTop: 10,
    alignItems: 'center',
  },
  coverImage: {
    width: 420,
    height: 420,
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
  duckImage: {
    width: '100%',
    height: '100%',
  },
  selectedBook: {
    borderWidth: 5,
    borderColor: 'rgba(184, 247, 10, 0.5)',
    // borderColor: 'rgba(180, 130, 210, 0.5)',
  },
  deleteModeTrashCan: {
    borderWidth: 5,
    borderColor: 'rgba(184, 247, 10, 0.5)',
    borderRadius: 100,
    backgroundColor: 'rgba(184, 247, 10, 0.5)',
  },
});
