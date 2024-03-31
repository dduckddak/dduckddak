import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import GreenButton from '../../../components/GreenButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import EmptyListComponent from '../../../components/EmptyListComponent';

// const windowWidth = Dimensions.get('window').width;

type Images = {
  coloringFile: string;
  coloringId: number;
}[];

interface SketchbookProps {
  images: Images;
  navigation: NavigationProp<ParamListBase>;
  isLoading?: boolean;
}

const SketchbookList: React.FC<SketchbookProps> = ({
  navigation,
  images,
  isLoading,
}) => {
  const handlePress = (item: { coloringFile: string; coloringId: number }) => {
    navigation.navigate('coloringDetail', item); // 이동
  };

  const renderItem = ({
    item,
  }: {
    item: { coloringFile: string; coloringId: number };
  }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.coloringFile }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎨 내가 칠한 그림 🎨</Text>
      <View style={styles.innerContainer}>
        <FlatList
          style={styles.flatList}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.coloringId.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainer}
          ListEmptyComponent={
            isLoading && images.length === 0 ? (
              <EmptyListComponent imageHeightRatio={0.55} />
            ) : null
          }
        />
      </View>
      <GreenButton
        onPress={() => navigation.navigate('coloring')}
        content="색칠하러 가기"
        style={styles.naviBtn}
      />
      <Image
        source={require('../../../assets/images/sketchbookheader.png')}
        style={styles.header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 50,
    top: 0,
  },
  container: {
    marginTop: Dimensions.get('screen').height * 0.04,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '70%',
    backgroundColor: 'rgba(205, 234, 185, 0.6)',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
    marginTop: '4%',
    padding: '2%',
  },
  imagesContainer: {
    marginTop: '5%',
    width: '90%',
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 15,
  },
  header: {
    position: 'absolute',
    top: '8%',
    width: '90%',
    height: Dimensions.get('screen').height * 0.13,
    resizeMode: 'stretch',
  },
  flatList: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
  },
  flatListContentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  image: {
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').width / 3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  naviBtn: {
    width: Dimensions.get('screen').width * 0.15,
    marginTop: Dimensions.get('screen').height * 0.01,
  },
});

export default SketchbookList;
