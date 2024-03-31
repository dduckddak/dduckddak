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

interface BookItemsProps {
  title: string;
  coverImage: string;
  makeBookId: number;
  isDeleteMode: boolean;
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  navigation: any;
}

const BookItems: React.FC<BookItemsProps> = ({
  title,
  coverImage,
  makeBookId,
  isDeleteMode,
  selectedItems,
  setSelectedItems,
  navigation,
}) => {
  const CharrrrAnimation = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    return () => CharrrrAnimation.removeAllListeners();
  });

  const isSelected = selectedItems.includes(makeBookId);

  const handleSelectItem = () => {
    if (isDeleteMode) {
      // 삭제 모드일 때의 로직
      const newSelectedItems = isSelected
        ? selectedItems.filter((id) => id !== makeBookId)
        : [...selectedItems, makeBookId];
      setSelectedItems(newSelectedItems);
    } else {
      // 삭제 모드가 아닐 때의 로직 (상세 페이지로 이동 등)
      handlePress();
    }
  };

  const handlePress = () => {
    CharrrrAnimation.setValue(1);
    // CharrrrAnimation.addListener(({ value }) => console.log(value));

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
    <TouchableOpacity style={styles.bookItem} onPress={handleSelectItem}>
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
  const [makeBookList, setMakeBookList] = useState<MakeBookListData>();

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

  const handleDeleteItems = async () => {
    console.log(selectedItems);
    try {
      await deleteMakeBook(selectedItems);
      setIsDeleteMode(false);
      setSelectedItems([]);
      fetchMakeBooks();
    } catch (error) {
      console.error('Failed to delete items', error);
      Alert.alert('Error', 'Failed to delete books');
    }
  };

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
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
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.bookList}
        />
      </View>
      <TouchableOpacity
        style={styles.trash}
        onPress={() => setIsDeleteMode(!isDeleteMode)}
      >
        <Image
          source={require('../../assets/images/Trash.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
      {isDeleteMode && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteItems}
        >
          <Text>Delete Selected</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  bookList: {
    alignItems: 'center',
    paddingTop: 90,
  },
  bookItem: {
    margin: 20,
    alignItems: 'center',
  },
  coverImage: {
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.65,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: Colors.green,
    zIndex: 20,
  },
  title: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 45,
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 5, height: 4 },
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
    right: '92.5%',
    top: '86%',
  },
  deleteButton: {
    position: 'absolute',
    right: '92.5%',
    top: '96%',
  },
  bookContainer: {},
  selectedItem: {},
});
