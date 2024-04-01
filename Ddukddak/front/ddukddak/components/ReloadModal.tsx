import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

type ReloadModalProps = {
  isVisible: boolean;
  onRepeat: () => void;
  onHome: () => void;
};

const ReloadModal = ({ isVisible, onRepeat, onHome }: ReloadModalProps) => {
  const repeatBtnImage = require('../assets/images/button/return.png');
  const homeBtnImage = require('../assets/images/button/home.png');

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onRepeat}>
          <Image source={repeatBtnImage} style={styles.returnimage} />
          <Text style={styles.text}>다시읽기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHome}>
          <Image source={homeBtnImage} style={styles.homeimage} />
          <Text style={styles.text}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').width * 0.3,
    borderRadius: 10,
  },
  returnimage: {
    width: '80%',
    height: '70%',
    resizeMode: 'stretch',
  },
  homeimage: {
    width: '80%',
    height: '70%',
    resizeMode: 'stretch',
  },
  text: {
    color: '#fff',
    fontSize: 75,
    fontFamily: 'im-hyemin-bold',
  },
});

export default ReloadModal;
