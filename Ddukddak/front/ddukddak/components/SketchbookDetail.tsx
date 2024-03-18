import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';
import GreenButton from './GreenButton';

type SketchImage = {
  source: ImageSourcePropType;
  id: string;
};


interface SketchbookDetailProps {
  image: SketchImage;
}

const SketchbookDetail: React.FC<SketchbookDetailProps> = ({ image }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.imagesContainer}>
        <Image source={image.source} style={styles.imageStyle} />
      </View>
    </View>
    <GreenButton
      content="삭제하기"
      style={styles.naviBtn}
     onPress={() => console.log(image.id)}/>


    <Image
      source={require('../assets/images/sketchbookheader.png')}
      style={styles.header} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
  },
  imagesContainer: {
    width: '80%',
    height: '90%',
  },
  header: {
    position: 'absolute',
    top: '-7%',
    width: '90%',
    height: 150,
    resizeMode: 'stretch',
  },
  imageStyle: {
    width: '60%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  naviBtn: {
    width: Dimensions.get('screen').width * 0.15,
    marginTop:
      Dimensions.get('screen').height * 0.04,
  },
});

export default SketchbookDetail;
