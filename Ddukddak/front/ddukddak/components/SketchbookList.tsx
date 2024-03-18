import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

type Images = {
  source: ImageSourcePropType;
  id: string;
}[];

interface SketchbookProps {
  images: Images;
}

const SketchbookList: React.FC<SketchbookProps> = ({ images }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.imagesContainer}>
        {images.map(({ source, id }) => (
          <View style={styles.gridItem} key={id}>
            <Image source={source} style={styles.gridImage} />
          </View>
        ))}
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
  gridItem: {
    width: '25%',
    height: '49%',
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: '5%',
    width: '90%',
    height: 150,
    resizeMode: 'stretch',
  },
});

export default SketchbookList;
