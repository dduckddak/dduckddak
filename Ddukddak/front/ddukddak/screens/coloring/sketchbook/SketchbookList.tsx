import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
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
}


const SketchbookList: React.FC<SketchbookProps> = ({ navigation, images }) => {
  const handlePress = (item: { coloringFile: string; coloringId: number; }) => {
    navigation.navigate('coloringDetail', item); // 이동
  };


  const renderItem = ({ item }: { item: { coloringFile: string; coloringId: number; } }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.coloringFile }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.innerContainer}>

        <FlatList
          style={styles.flatList}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.coloringId.toString()}
          numColumns={4}
          contentContainerStyle={styles.flatListContentContainer}
          ListEmptyComponent={<EmptyListComponent imageHeightRatio={0.55} />}
        />
      </View>
      <GreenButton
        onPress={() => navigation.navigate('coloring')}
        content="색칠하러 가기"
        style={styles.naviBtn}
      />
      <Image
        source={require('../../../assets/images/sketchbookheader.png')}
        style={styles.header} />

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('screen').height * 0.04,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position : 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '70%',
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
    height: Dimensions.get('screen').height * 0.13,
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
