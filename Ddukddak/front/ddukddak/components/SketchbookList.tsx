import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import GreenButton from './GreenButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

// const windowWidth = Dimensions.get('window').width;

type Images = {
  source: ImageSourcePropType;
  id: string;
}[];

interface SketchbookProps {
  images: Images;
  navigation: NavigationProp<ParamListBase>;
}




const SketchbookList: React.FC<SketchbookProps> = ({ navigation, images }) => {
  const handlePress = (item: { source: ImageSourcePropType; id: string; }) => {
    console.log(item.id); // 아이디가 콘솔에 출력됩니다
    navigation.navigate('coloringDetail', item); // 이동
  };


  const renderItem = ({ item }: { item: { source: ImageSourcePropType; id: string; } }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => handlePress(item)}>
      <Image source={item.source} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          style={styles.flatList}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
      <GreenButton
        onPress={() => navigation.navigate('coloring')}
        content="색칠하러 가기"
        style={styles.naviBtn}
      />

      <Image
        source={require('../assets/images/sketchbookheader.png')}
        style={styles.header} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '65%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
  },
  imagesContainer: {
    width: '95%',
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
    top: '0%',
    width: '90%',
    height: 150,
    resizeMode: 'stretch',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  flatListContentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  image: {
    width: Dimensions.get('screen').width / 6,
    height: Dimensions.get('screen').width / 6,
    resizeMode: 'cover',
    alignSelf: 'center',

  },
  naviBtn: {
    width: Dimensions.get('screen').width * 0.15,
    marginTop:
      Dimensions.get('screen').height * 0.04,
  },
});

export default SketchbookList;
