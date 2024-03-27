import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { getVoices, previewVoice } from '../../api/voiceApi';
import { Audio } from 'expo-av';

interface Voice {
  voiceId: number;
  voiceName: string;
}

function AddVoice({ route, navigation }: any) {
  const { role } = route.params;

  const [voiceData, setVoiceData] = useState<Voice[]>([]);

  // 현재 재생 중인 사운드를 추적하는 상태 변수
  const [currentSound, setCurrentSound] = useState<Audio.Sound>();

  const readList = async () => {
    try {
      const result = await getVoices();
      if (Array.isArray(result.voiceList)) {
        setVoiceData(result.voiceList);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
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

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => console.log(item.voiceName)}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.cardTitle}>{item.voiceName}</Text>
          <TouchableOpacity onPress={() => preview(item.voiceId)}>
            <Text style={styles.buttonText}>미리듣기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('삭제 버튼')}>
            <Text style={styles.buttonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <Text style={styles.titleText}>{role}의 목소리 찾아주기</Text>
      <FlatList
        data={voiceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.voiceId.toString()}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <GreenButton
        content="추가하기"
        onPress={() => navigation.navigate('addvoice' as never)}
      />
    </ImageBackground>
  );
}

export default AddVoice;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#B7E29B',
    display: 'flex',
    width: 400,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardPreview: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  titleText: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
  },
});
