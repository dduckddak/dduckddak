import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { getVoices, previewVoice } from '../../api/voiceApi';
import { Audio } from 'expo-av';
import EmptyListComponent from '../../components/EmptyListComponent';
import { useFairyStore } from '../../store/fairyStore';
import { VoiceData, SelectableVoiceData } from '../../types/types';
import useTouchEffect from '../../components/sound/TouchEffect';

const CloudAnimation = ({ children }: { children: React.ReactNode }) => {
  const [cloudAnimationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateClouds = () => {
      const cloudAnimation = Animated.sequence([
        Animated.timing(cloudAnimationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnimationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(cloudAnimation).start();
    };
    animateClouds();
    return () => { };
  }, [cloudAnimationValue]);
  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: screenHeight * 0.05,
        left: screenWidth * 0.005,
        width: screenWidth * 0.2,
        height: screenHeight * 0.2,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

function AddVoice({ route, navigation }: any) {
  const { playTouch } = useTouchEffect();

  // 오리
  const duckPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(duckPosition, {
          toValue: { x: screenWidth * 0.1, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(duckPosition, {
          toValue: { x: 2, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const { currentStep, role } = route.params;

  const [selectMode, setSelectMode] = useState<boolean>();
  const [voiceData, setVoiceData] = useState<SelectableVoiceData[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceData | null>(null);

  const [currentSound, setCurrentSound] = useState<Audio.Sound>();

  const { setSubVoice, setMainVoice, setNarration } = useFairyStore();

  const fetchVoices = async () => {
    try {
      const result = await getVoices();
      if (!result.voiceList) {
        console.log('목소리 목록 불러오는데 실패했음');
        return;
      }
      const fetchedVoiceData: SelectableVoiceData[] = result.voiceList.map(
        (voice) => ({
          voiceId: voice.voiceId,
          voiceName: voice.voiceName,
          selected: false,
        }),
      );
      setVoiceData(fetchedVoiceData);
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  };

  useEffect(() => {
    console.log(currentStep);
    fetchVoices();
  }, []);

  // 미리듣기 기능
  const preview = async (voiceId: number) => {
    try {
      const result = await previewVoice(voiceId);
      const previewFile = result.previewFile;

      if (previewFile) {
        // 이미 재생 중인 사운드가 있다면 중지하고 언로드
        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }

        // 새로운 사운드 로드
        const newSound = new Audio.Sound();
        await newSound.loadAsync({ uri: previewFile });
        await newSound.playAsync();

        // 현재 재생 중인 사운드를 상태에 설정
        setCurrentSound(newSound);
      }
    } catch (error: any) {
      console.error('Error playing sound:', error.message);
    }
  };

  // 삭제 기능
  // const deleteVoice = async (voiceId: number) => {
  //   try {
  //     const response = await deleteVoices({ deleteVoiceIds: [voiceId] });
  //     Alert.alert('삭제 성공', '목소리가 성공적으로 삭제되었습니다.');
  //     // 삭제 성공 후, 삭제된 목소리를 목록에서 제거
  //     setVoiceData(voiceData.filter((voice) => voice.voiceId !== voiceId));
  //   } catch (error: any) {
  //     console.error('Error deleting voice:', error.message);
  //     Alert.alert('삭제 실패', '목소리 삭제 중 오류가 발생했습니다.');
  //   }
  // };

  const handleSelectVoice = (index: number) => {
    const selected = voiceData[index];
    setSelectedVoice({
      voiceId: selected.voiceId,
      voiceName: selected.voiceName,
    });
    setSelectMode(true);
  };

  const handleSelectButtonPress = () => {
    switch (currentStep) {
      case 1:
        setMainVoice(selectedVoice);
        break;
      case 2:
        setSubVoice(selectedVoice);
        break;
      case 3:
        setNarration(selectedVoice);
        break;
      default:
        Alert.alert('Error', 'Unknown role.');
        return;
    }
    setSelectMode(false);
    navigation.goBack();
  };

  const renderItem = ({ item, index }: { item: VoiceData; index: number }) => (
    <TouchableOpacity onPress={() => handleSelectVoice(index)}>
      <View
        style={[
          styles.card,
          {
            borderWidth: selectedVoice?.voiceId !== item.voiceId ? 0 : 3,
          },
        ]}
      >
        <View style={styles.container1}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.voiceName}</Text>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => preview(item.voiceId)}
              style={styles.prelisten}
            >
              <Text style={styles.buttonText}>미리듣기</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => deleteVoice(item.voiceId)}>
              <Image
                source={require('../../assets/images/Trash.png')}
                style={styles.trash}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <Text style={styles.textStyle}>{role}의 목소리 찾아주기</Text>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <TouchableOpacity onPress={() =>
        playTouch('duck')
      } style={[styles.duck,
      {
        transform: [
          { translateX: duckPosition.x },
          { translateY: duckPosition.y },
        ],
      }
      ]}>
        <Animated.Image
          source={require('../../assets/images/duck.png')}
          style={styles.duckImage}
        />
      </TouchableOpacity>
      <FlatList
        data={voiceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.voiceId.toString()}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={<EmptyListComponent />}
      />
      <View style={styles.buttonContainer}>
        <GreenButton
          content={selectMode ? '선택완료' : '선택하기'}
          style={{ width: 220, paddingBottom: 40 }}
          onPress={handleSelectButtonPress}
        />
        <GreenButton
          content="목소리 추가하기"
          style={{ width: 220, paddingBottom: 40 }}
          onPress={() => navigation.navigate('addvoice' as never)}
        />
      </View>
    </ImageBackground>
  );
}

export default AddVoice;

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  prelisten: {
    backgroundColor: '#40AF91',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 50,
    borderRadius: 5,
  },
  cloud: {
    position: 'absolute',
    top: screenHeight * 0.005,
    left: screenWidth * 0.15,
  },

  cloud2: {
    position: 'absolute',
    top: screenHeight * 0.005,
    left: screenWidth * 0.65,
    width: screenWidth * 0.15,
    height: screenHeight * 0.2,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: screenHeight * 0.15,
    left: screenWidth * 0.88,
  },
  duck: {
    position: 'absolute',
    bottom: screenHeight * 0.15,
    left: screenWidth * 0.04,
    width: screenWidth * 0.09,
    height: screenHeight * 0.1,
    zIndex: 1
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    gap: 30,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end', // 가로로 오른쪽 정렬
    alignItems: 'center',
    gap: 10, //미리듣기랑 쓰레기통 사이 간격
  },
  card: {
    backgroundColor: '#B7E29B',
    width: 500,
    margin: 30,
    padding: 15,
    borderRadius: 5,
    elevation: 15,
    shadowColor: '#024e34',
    shadowOffset: { width: 2, height: 2 },
    borderColor: '#038a5b',
    borderWidth: 3,
  },
  cardTitle: {
    fontSize: 35,
    fontFamily: 'im-hyemin-bold',
  },
  cardPreview: {
    fontSize: 16,
  },
  buttonText: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 20,
    color: 'white',
  },
  textStyle: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
    marginTop: 25,
  },
  duckImage: {
    width: '100%',
    height: '100%',
  }
});
