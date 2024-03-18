import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';


type MyImage = {
  source: ImageSourcePropType;
  id: string;
};

interface SketchbookDetailProps {
  image: MyImage;
}

const SketchbookDetail: React.FC<SketchbookDetailProps> = ({ image }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.imagesContainer}>
        <Image source={image.source} style={styles.imageStyle} />
      </View>
    </View>

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
    height: '75%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
  },
  imagesContainer: {
    width: '95%',
    height: '90%',
  },
  header: {
    position: 'absolute',
    top: '5%',
    width: '90%',
    height: 150,
    resizeMode: 'stretch',
  },
  imageStyle: {
    width: '60%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});

export default SketchbookDetail;
