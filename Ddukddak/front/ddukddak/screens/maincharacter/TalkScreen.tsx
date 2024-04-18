import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Animated,
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
import useBgmStore from '../../store/BgmStore';

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
    return () => {
    };
  }, [cloudAnimationValue]);
  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 40,
        left: 20,
        width: 200,
        height: 130,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

type TalkScreenRouteProp = RouteProp<RootStackParamList, 'talk'>;
type TalkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'talk'>;

interface TalkScreenProps {
  route: TalkScreenRouteProp;
  navigation: TalkScreenNavigationProp;
}

function TalkScreen({ route }: TalkScreenProps) {
  const bookId = route.params.bookId;
  const { bgmSound, isPlaying } = useBgmStore();
  const [subName, setSubName] = useState<string>();
  const [subBasic, setSubBasic] = useState<string>();
  const [subTalk, setSubTalk] = useState<string>();
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  // 음... 상태
  const [isWaiting, setIsWaiting] = useState(false);

  /*
    처음 화면에 들어왔을 때 캐릭터쪽에 말풍선이 생겨 있다. (ex. 안녕 지금부터 회원이가 빨간모자야)
    isRecording이 false일 때 녹음 버튼을 누르면 녹음을 시작하면 isRecording이 true가 되면서 녹음모드가 시작된다.(startRecording함수 수행)
    isRecording이 true일 때 마이크에 말을 전부 다한 뒤 녹음종료 버튼을 누르면 isRecording이 false가 되면서 stopRecording함수가 수행된다

   */
  const [isRecording, setIsRecording] = useState(false);
  const [characterTalking, setCharacterTalking] = useState(true);

  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined,
  );

  const [userScript, setUserScript] = useState<string | null>('');
  const [characterScript, setCharacterScript] = useState<string | null>('');
  const [displayedCharacterScript, setDisplayedCharacterScript] = useState('');
  const [displayedUserScript, setDisplayedUserScript] = useState('');

  const loadTalk = async (bookId: number) => {
    try {
      const result = await getTalkDetail(bookId);
      console.log(result);
      //   name 캐릭터 이름 , basic 기본 이미지, talk 말하는 이미지
      setSubName(result.subName);
      setSubBasic(result.subBasic);
      setSubTalk(result.subTalk);
      setCharacterScript(result.welcomeComment);

      playAudio(result.welcomeCommentSound);
    } catch (error) {
      console.error('load Talk :', error);
    }
  };


  useEffect(() => {

    let index = 0;
    // 이미 타이머가 실행중이라면 이전 타이머를 멈춥니다.
    let timerId: NodeJS.Timeout;
    setDisplayedCharacterScript('');

    function typeWriter() {
      if (index < (characterScript || '').length) {
        setDisplayedCharacterScript((prevScript) => prevScript + characterScript?.charAt(index));
        index++;
      } else {
        setIsSoundPlayed(false);
        clearTimeout(timerId);
      }
    }

    // 글자가 나타나는 타이머를 설정합니다.
    timerId = setInterval(typeWriter, 150);

    return () => {
      clearTimeout(timerId); // 컴포넌트가 언마운트시 타이머를 멈춥니다.

    };
  }, [characterScript]);


  useEffect(() => {
    let index = 0;
    // 이미 타이머가 실행중이라면 이전 타이머를 멈춥니다.

    if (!userScript) {
      return;
    }
    let timerId: NodeJS.Timeout;
    setDisplayedUserScript('');

    function typeWriter() {
      if (index < (userScript || '').length) {
        setDisplayedUserScript((prevScript) => prevScript + userScript?.charAt(index));
        index++;
      } else {
        // setCharacterScript('음...');
        // setCharacterTalking(true);
        clearTimeout(timerId);
      }
    }
    // 글자가 나타나는 타이머를 설정합니다.
    timerId = setInterval(typeWriter, 150);

    return () => {
      clearTimeout(timerId); // 컴포넌트가 언마운트시 타이머를 멈춥니다.
    };
  }, [userScript]);

  useEffect(() => {
    if (isPlaying) {
      bgmSound?.pauseAsync();
    }

    return () => {
      if (isPlaying) {
        bgmSound?.playAsync();
      }
    };
  }, []);

  useEffect(() => {
    loadTalk(bookId);
  }, []);

  async function startRecording() {
    const { status } = await Audio.requestPermissionsAsync();
    setIsRecording(true);
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
      if (subTalk) {
        setIsSoundPlayed(true);
      }
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

  const playAudio = async (File: string) => {
    const soundObject = new Audio.Sound();

    await soundObject.loadAsync({ uri: File });

    await soundObject.playAsync();
  };

  // const onPlaybackStatusUpdate = (playbackStatus: any,File : Audio.Sound) => {
  //   if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
  //     File.unloadAsync();
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/background/background3.png')}
        style={styles.imageBackground}
      >
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud}
          />
          <CloudAnimation>
            <Image
              source={require('../../assets/images/Main/cloud.png')}
              style={styles.cloud1}
            />
          </CloudAnimation>
        </CloudAnimation>
        {subBasic && subTalk && (
          <Image source={{ uri: isSoundPlayed ? subTalk : subBasic }} style={styles.characterImage} />
        )}

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 60,
            paddingRight: Dimensions.get('screen').width * 0.4,
          }}
        >
          <Image
            source={require('../../assets/images/talk/talk.png')}
            style={[
              characterTalking ? {} : { transform: [{ scaleX: -1 }] },
              { width: 720, height: 555, marginLeft: -50, marginTop: 35 },
            ]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.bigtext}>
              {characterTalking ? displayedCharacterScript : displayedUserScript}
            </Text>
          </View>
          {/* 대화 말풍선 나올 영역 끝 */}

          {isRecording ? (
            <GreenButton
              onPress={stopRecording}
              content={'대화끝내기'}
              style={{
                width: '35%',
                marginLeft: 200,
              }}
            />
          ) : (
            <GreenButton
              onPress={startRecording}
              content={'대화하기'}
              style={{
                width: '35%',
                marginLeft: 200,
              }}
            />
          )}
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
  cloud: {
    position: 'absolute',
    top: 100,
    left: 85,
    width: 120,
    height: 120,
  },
  cloud1: {
    position: 'absolute',
    top: -20,
    left: 300,
    width: 250,
    height: 170,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  characterImage: {
    width: 452,
    height: 450,
    marginLeft: 510,
    marginTop: 255,
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 580,
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigtext: {
    fontSize: 40,
    fontFamily: 'im-hyemin-bold',
    textAlign: 'center',
  },
});