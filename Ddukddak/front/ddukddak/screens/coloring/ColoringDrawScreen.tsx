import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import { NavigationProp, ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel5, OpacitySlider, colorKit, PreviewText } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';
import GreenButton from '../../components/GreenButton';
import AlertModal from '../../components/AlertModal';


interface ColoringDrawScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

type ColoringImage = {
  uri: string;
};

type ParamListBase = {
  coloringFile: ColoringImage;
};


const ColoringDrawScreen: React.FC<ColoringDrawScreenProps> = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);


  const route = useRoute<RouteProp<ParamListBase, 'coloringFile'>>();
  const image = route.params.uri;

  useEffect(() => {
    console.log(image);
  }, []);


  const webViewRef = React.useRef<WebView>(null);

  const initialColor = colorKit.HEX('black');
  //
  const selectedColor = useSharedValue(initialColor);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;

  };

  const handleCloseModal = () => {
    setShowModal(false);
    const data = {
      type: 'colorChange',
      value: selectedColor.value,
    };
    webViewRef.current.postMessage(JSON.stringify(data));
  };

  const handleSave = () => {
    console.log('저장 실행');
    const data = {
      type: 'saveImage',
    };

    webViewRef.current.postMessage(JSON.stringify(data));
  };

  const handleClickSaveModal = () => {
    navigation.goBack();
    navigation.goBack();
  };


  const handleMessage = async (event: WebViewMessageEvent) => {
    const msgData = JSON.parse(event.nativeEvent.data);
    if (msgData.type === 'saveImage') {
      const dataUrl = msgData.value;
      console.log(dataUrl);
    }
  };


  return (

    <ImageBackground
      source={require('../../assets/images/background/background.png')}
      style={styles.imageBackground}
    >
      <TouchableOpacity style={styles.paletteButtonContainer} onPress={() => setShowModal(true)}>
        <Image
          source={require('../../assets/images/coloring/palette.png')}
          style={styles.paletteButton}
        />
      </TouchableOpacity>
      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType="slide">
        <Animated.View style={[pickerStyles.container, backgroundColorStyle]}>
          <View style={pickerStyles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape="circle"
              onChange={onColorSelect}
            >
              <Panel5 style={pickerStyles.panelStyle} />

              <OpacitySlider style={pickerStyles.sliderStyle} adaptSpectrum />

              <View style={pickerStyles.previewTxtContainer}>
                <PreviewText style={{ color: '#707070' }} colorFormat="hex" />
              </View>
            </ColorPicker>
          </View>

          <Pressable style={pickerStyles.closeButton} onPress={handleCloseModal}>
            <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
          </Pressable>
        </Animated.View>
      </Modal>


      <View style={styles.webviewContainer}>
        <Image
          source={require('../../assets/images/coloring/coloring_side_dduk.png')}
          style={styles.sideImageTop}
        />
        <Image
          source={require('../../assets/images/coloring/coloring_side_ddak.png')}
          style={styles.sideImageBottom}
        />
        <WebView
          ref={webViewRef}
          source={{ uri: 'http://192.168.30.124:3000' }}
          style={styles.webviewStyle}
          injectedJavaScript={`window.imgSrc = "${image}";`}
          onMessage={handleMessage}
        />
      </View>


      <GreenButton style={styles.saveButtonContainer} onPress={handleSave} content="저장" />
      <AlertModal isVisible={saveModal} text={['스케치북에 저장되었어요!']} onConfirm={handleClickSaveModal} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webviewContainer: {
    marginTop: Dimensions.get('window').height * 0.08,
    height: Dimensions.get('screen').height * 0.80,
    width: Dimensions.get('screen').width * 0.85,
    padding: 30,
    backgroundColor: '#D1A271',
  },
  webviewStyle: {
    flex: 1,
  },
  sideImageTop: {
    position: 'absolute',
    top: 30,
    right: -85,
    width: 100,
    height: 100,
  },
  sideImageBottom: {
    position: 'absolute',
    top: 150,
    right: -85,
    width: 100,
    height: 100,
  },
  paletteButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    zIndex: 2,
  },
  paletteButton: {
    width: 150,
    height: 150,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.05,
    right: Dimensions.get('screen').width * 0.04,
    width: 100,
    height: 60,
  },
});


const pickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ColoringDrawScreen;
