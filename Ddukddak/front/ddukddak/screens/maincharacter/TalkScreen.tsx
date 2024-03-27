import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  cacheDirectory,
  writeAsStringAsync,
  EncodingType
} from 'expo-file-system';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getTalkDetail, sttTalk, triggerTalk } from '../../api/talkApi';
import { Audio } from 'expo-av';

type TalkScreenRouteProp = RouteProp<RootStackParamList, 'talk'>;
type TalkScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'talk'
>;

interface TalkScreenProps {
  route: TalkScreenRouteProp;
  navigation: TalkScreenNavigationProp;
}

function TalkScreen({ route }: TalkScreenProps) {
  const bookId = route.params.bookId;
  const [subName, setSubName] = useState<string>();
  const [subBasic, setSubBasic] = useState<string>();
  const [subTalk, setSubTalk] = useState<string>();
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [userScript, setUserScript] = useState<string | null>('');
  const [gptScript, setGptScript] = useState<string | null>('');

  const loadTalk = async (bookId: number) => {
    try {
      const result = await getTalkDetail(bookId);
      setSubName(result.subName);
      setSubBasic(result.subBasic);
      setSubTalk(result.subTalk);
    } catch (error) {
      console.error('load Talk :', error);
    }
  };

  useEffect(() => {
    loadTalk(bookId);
  }, []);

  async function startRecording() {
    const { status } = await Audio.requestPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.error('권한 거절');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('녹음 시작');

    } catch (err) {
      console.error('녹음 실패', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      console.log('녹음 종료');
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      setRecording(undefined);

      if (uri !== null) {
        const sttResult = await handleUploadSound(uri);
        if (sttResult != null) {
          setUserScript(sttResult);
          await handleDownloadSound(sttResult)
        }
      }
    } else {
      console.log('No active recording to stop.');
    }
  }

  const handleUploadSound = async (uri: string) => {
    const talkFile: any = {
      uri: uri,
      type: 'audio/mp3', // 적절한 MIME 타입 지정
      name: `talkFile.mp3`, // 파일 이름 지정
    }

    try {
      const response = await sttTalk(talkFile as File);

      return response.userScript;

    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadSound = async (userScript: string) => {
    const TalkParm = {
      bookId: bookId,
      userScript: userScript
    }

    try {
      const response = await triggerTalk(TalkParm);

      setGptScript(response.gptScript)
      await playBase64Audio(response.gptVoiceFile);

    } catch (error) {
      console.error(error);
    }
  };

  // base64 인코딩된 오디오 데이터를 재생하는 함수
  const playBase64Audio = async (base64Audio: string) => {
    try {
      const tmpFilename = `${cacheDirectory}speech.mp3`;
      await writeAsStringAsync(tmpFilename, base64Audio, {
        encoding: EncodingType.Base64
      });

      // 새로운 오디오 객체 생성
      const soundObject = new Audio.Sound();

      // 오디오 로드
      await soundObject.loadAsync({ uri: tmpFilename });

      // 오디오 재생
      await soundObject.playAsync();

    } catch (error) {
      console.error('오디오 재생 중 오류 발생:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/background/background.png')}
        style={styles.imageBackground}
      >
        <Text style={styles.bigtext}>{subName}</Text>
        <View>
          <Image
            source={{ uri: subBasic }}
            style={styles.bookImage}
          />
          <Text style={styles.bigtext}>{userScript}</Text>
          <Text style={styles.bigtext}>{gptScript}</Text>
          <TouchableOpacity
            onPress={startRecording}
            style={styles.buttonStyle}
          >
            <Text style={styles.text}>말하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopRecording}
            style={styles.buttonStyle}
          >
            <Text style={styles.text}>말끝내기</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default TalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  bookImage: {
    width: '60%',
    height: '90%', // 이미지가 전체 컨테이너의 80%를 차지하도록 설정
    resizeMode: 'cover',
    borderRadius: 5,
  },
  buttonStyle: {
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'im-hyemin-bold',
  },
  bigtext: {
    fontSize: 10
  },
});
