import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  cacheDirectory,
  writeAsStringAsync,
  EncodingType,
} from 'expo-file-system';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getTalkDetail, sttTalk, triggerTalk } from '../../api/talkApi';
import { Audio } from 'expo-av';
import GreenButton from '../../components/GreenButton';

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


  /*
    처음 화면에 들어왔을 때 캐릭터쪽에 말풍선이 생겨 있다. (ex. 안녕 지금부터 회원이가 빨간모자야)
    isRecording이 false일 때 녹음 버튼을 누르면 녹음을 시작하면 isRecording이 true가 되면서 녹음모드가 시작된다.(startRecording함수 수행)
    isRecording이 true일 때 마이크에 말을 전부 다한 뒤 녹음종료 버튼을 누르면 isRecording이 false가 되면서 stopRecording함수가 수행된다

   */
  const [isRecording, setIsRecording] = useState(false);
  const [characterTalking, setCharacterTalking] = useState(true);

  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);

  const [userScript, setUserScript] = useState<string | null>('');
  const [characterScript, setCharacterScript] = useState<string | null>('');

  const loadTalk = async (bookId: number) => {
    try {
      const result = await getTalkDetail(bookId);
      //   name 캐릭터 이름 , basic 기본 이미지, talk 말하는 이미지
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
    setIsRecording(true)
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
      // 실패시 레코딩 모드 변경
      setIsRecording(false);
    }
  }

  async function stopRecording() {
    setIsRecording(false);

    if (recording) {
      console.log('녹음 종료');
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      setRecording(undefined);

      if (uri !== null) {
        const sttResult = await handleUploadSound(uri);
        if (sttResult != null) {
          // 유저 스크립트를 화면에 출력( 텍스트로 변환된 유저의 대화 내용을 userScript에 담아주고 chracterTalking을 false로 바꾸면서 유저 말풍선 출력
          setUserScript(sttResult);
          setCharacterTalking(false);
          await handleDownloadSound(sttResult);
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
    };

    try {
      const response = await sttTalk(talkFile as File);

      return response.userScript;

    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadSound = async (userScript: string) => {
    const talkParams = {
      bookId: bookId,
      userScript: userScript,
    };

    try {
      const response = await triggerTalk(talkParams);
      // 정상적으로 답변이 전달되었을 때 캐릭터의 대화내용을 characterScript에 담아주고
      // characterTalking을 true로 바꾸면서 유저 말풍선을 끄고 캐릭터 말풍선을 렌더링
      setCharacterScript(response.gptScript);
      setCharacterTalking(true);
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
        encoding: EncodingType.Base64,
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
        <View
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: subBasic }}
            style={styles.characterImage}
          />
        </View>

        <View
          style={{
            flex: 3,
            // borderWidth: 3,
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              // borderWidth: 2,
              // borderColor: 'green',
            }}
          >
            {/* 대화 말풍선 나올 영역 시작 */}

            {/* TODO 현재 임시로 Text로 구현, 나중에 말풍선 안에 텍스트가 담기게 CSS 수정해야함 */}
            {
              characterTalking ? (
                <Text style={styles.bigtext}>캐릭터 스크립트 : {characterScript}</Text>
              ) : (
                <Text style={styles.bigtext}>유저스크립트 :{userScript}</Text>
              )
            }
            {/* 대화 말풍선 나올 영역 끝 */}
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 2,
              // borderColor: 'yellow',
              justifyContent: 'center',
            }}
          >
            {isRecording ? (
              <GreenButton onPress={stopRecording} content={'대화끝내기'}
                           style={{
                             width: '40%',
                           }}
              />
            ) : (
              <GreenButton onPress={startRecording} content={'대화하기'}
                           style={{
                             width: '40%',
                           }}
              />
            )}
          </View>

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
  innerContainer: {
    marginBottom: 160, // 아래 여백 추가
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  imageContainer: {
    flex: 2,
    height: '100%',
    // borderWidth: 3,
    // borderColor: 'blue',

  },
  characterImage: {
    width: '100%',
    height: '100%', // 이미지가 전체 컨테이너의 80%를 차지하도록 설정
    resizeMode: 'contain',


  },
  bigtext: {
    fontSize: 40,
    // borderWidth: 3,
  },
});
