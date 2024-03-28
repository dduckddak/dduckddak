import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { getVoices, previewVoice, deleteVoices } from '../../api/voiceApi';
import { Audio } from 'expo-av';
import EmptyListComponent from '../../components/EmptyListComponent';

interface Voice {
  voiceId: number;
  voiceName: string;
}

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
    return () => {};
  }, [cloudAnimationValue]);
  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 45,
        left: 50,
        width: 200,
        height: 130,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

function VoiceScreen() {
  const navigation = useNavigation();

  const [voiceData, setVoiceData] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 현재 재생 중인 사운드를 추적하는 상태 변수
  const [currentSound, setCurrentSound] = useState<Audio.Sound>();

  const readList = async () => {
    setIsLoading(true);
    try {
      const result = await getVoices();
      if (Array.isArray(result.voiceList)) {
        setVoiceData(result.voiceList);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    readList();
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
  const deleteVoice = async (voiceId: number) => {
    try {
      const response = await deleteVoices({ deleteVoiceIds: [voiceId] });
      Alert.alert('삭제 성공', '목소리가 성공적으로 삭제되었습니다.');
      // 삭제 성공 후, 삭제된 목소리를 목록에서 제거
      setVoiceData(voiceData.filter((voice) => voice.voiceId !== voiceId));
    } catch (error: any) {
      console.error('Error deleting voice:', error.message);
      Alert.alert('삭제 실패', '목소리 삭제 중 오류가 발생했습니다.');
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => console.log(item.voiceName)}>
      <View style={styles.card}>
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
            <TouchableOpacity onPress={() => deleteVoice(item.voiceId)}>
              <Image
                source={require('../../assets/images/Trash.png')}
                style={styles.trash}
              />
            </TouchableOpacity>
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
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud1}
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
      {}
      <FlatList
        data={voiceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.voiceId.toString()}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={
          !isLoading && voiceData.length === 0 ? <EmptyListComponent /> : null
        }
      />
      <GreenButton
        content="목소리 추가하기"
        style={{ width: 220, paddingBottom: 40 }}
        onPress={() => navigation.navigate('addvoice' as never)}
      />
    </ImageBackground>
  );
}

export default VoiceScreen;

const styles = StyleSheet.create({
  prelisten: {
    backgroundColor: '#40AF91',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 50,
    borderRadius: 5,
  },
  cloud: { position: 'absolute', top: 5, left: 200 },
  cloud1: { position: 'absolute', top: 30, left: 400, width: 220, height: 140 },
  cloud2: {
    position: 'absolute',
    top: 5,
    left: 700,
    width: 150,
    height: 110,
    transform: 'scaleX(-1)',
  },
  cloud3: { position: 'absolute', top: 125, left: 1060 },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
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
  trash: { width: 60, height: 60 },
});
