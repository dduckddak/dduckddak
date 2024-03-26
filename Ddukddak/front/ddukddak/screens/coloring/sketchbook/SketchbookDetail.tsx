import React, { useState } from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';
import GreenButton from '../../../components/GreenButton';
import SkyButton from '../../../components/SkyButton';
import ConfirmModal from '../../../components/ConfirmModal';
import * as url from 'node:url';

type SketchImage = {
  coloringFile: string;
  coloringId: number;
};

interface SketchbookDetailProps {
  image: SketchImage;
}

const SketchbookDetail: React.FC<SketchbookDetailProps> = ({ image }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imagesContainer}>
          <Image source={{ uri: image.coloringFile }} style={styles.imageStyle} />
        </View>
      </View>
      <GreenButton
        content="삭제하기"
        style={styles.naviBtn}
        onPress={() => setModalVisible(true)} />


      <ConfirmModal
        isVisible={modalVisible}
        text={['정말 이 작품을 버리실건가요?', '이제 다신 못봐요']}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <Image
        source={require('../../../assets/images/sketchbookheader.png')}
        style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('screen').height * 0.07,
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
