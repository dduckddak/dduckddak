import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { getMakeBookDetail } from '../../api/makeBookApi';
import { PageData } from '../../types/types';
import { Audio } from 'expo-av';

import * as url from 'node:url';
import { Sound } from 'expo-av/build/Audio/Sound';
import ReloadModal from '../../components/ReloadModal';
import useBgmStore from '../../store/BgmStore';

import useTouchEffect from '../../components/sound/TouchEffect';

type BookDetailScreenRouteProp = RouteProp<
  { params: { makeBookId: string } },
  'params'
>;

const MakingBook: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookDetails, setBookDetails] = useState<PageData[]>([]);
  const [isPlay, setIsPlay] = useState<boolean[]>([]);
  const soundObjectRef = useRef<Sound | null>(null);
  const [isReloadModal, setIsReloadModal] = useState(false);
  const navigation = useNavigation();

  const route = useRoute<BookDetailScreenRouteProp>();
  const makeBookId = route.params.makeBookId;

  const { playTouch } = useTouchEffect();
  const { bgmSound, isPlaying } = useBgmStore();

  // Existing state and refs

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onNextPress = () => {
    fadeOut(); // Start fading out
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 2 < bookDetails.length ? prevIndex + 2 : prevIndex,
      );
      fadeIn(); // Fade in after updating the index
    }, 500);
  };

  const onPrevPress = () => {
    fadeOut();
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 2 >= 0 ? prevIndex - 2 : prevIndex,
      );
      fadeIn();
    }, 500);
  };

  // const onNextPress = () => {
  //   playTouch('page');
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex + 2 < bookDetails.length ? prevIndex + 2 : prevIndex,
  //   );
  // };

  // const onPrevPress = () => {
  //   playTouch('page');
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 2 >= 0 ? prevIndex - 2 : prevIndex,
  //   );
  // };

  useEffect(() => {
    if (bgmSound) {
      bgmSound.stopAsync();
    }

    return () => {
      if (isPlaying) {
        bgmSound?.playAsync();
      }
    };
  }, []);

  /**
   * 현재 인덱스가 변경될때마다 실행됨, 변경된 인덱스를 기반으로 음성파일의 링크들을 배열로 만들고,
   * 반복문을 통해 각각의 음성파일들을 연달아서 재생시킴
   * 도중에 인덱스가 변경되었을 때 기존에 재생하던 음성 재생을 중지시킴
   */
  useEffect(() => {
    if (bookDetails.length === 0) return;

    isPlay[currentIndex] = true; // 페이지 재생전 flag 선언

    // 왼쪽 페이지부터 오른쪽 페이지 순서대로 sound 파일들 배열에 담아주기
    const currentScriptSounds: string[] = bookDetails[
      currentIndex
    ].pageDetail.map((detail) => detail.scriptSound);
    const nextScriptSounds: string[] = bookDetails[
      currentIndex + 1
    ].pageDetail.map((detail) => detail.scriptSound);
    const combinedScriptSounds: string[] = [
      ...currentScriptSounds,
      ...nextScriptSounds,
    ];

    const playSounds = async () => {
      for (const [i, sound] of combinedScriptSounds.entries()) {
        // 현재 진행중이던 페이지 인덱스에서 벗어났으면 해당 스크립트들에 대한 재생 종료
        if (!isPlay[currentIndex]) {
          break;
        }

        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          { uri: sound },
          { shouldPlay: true },
        );
        // currentIndex 바뀔 때 재생 멈추기 위해서 ref 잡아줌
        soundObjectRef.current = soundObject;

        if (!status.isLoaded) {
          continue; // 재생에 문제생겼을 때 다음 스크립트로 예외처리
        }

        // 현재 재생중인 게 끝나고 나면 다음거 재생하도록 await
        await new Promise<void>((resolve) => {
          soundObject.setOnPlaybackStatusUpdate((playbackStatus) => {
            if (
              !playbackStatus.isLoaded ||
              (playbackStatus.positionMillis !== undefined &&
                playbackStatus.durationMillis !== undefined &&
                playbackStatus.positionMillis === playbackStatus.durationMillis)
            ) {
              resolve();
            }
          });
        });

        await soundObject.unloadAsync();
        soundObjectRef.current = null;

        // console.log(`진행상황 체크 i = ${i} , 스크립트 길이 = ${combinedScriptSounds.length}, currentIndex = ${currentIndex}, bookdetails.length = ${bookDetails.length}`)
        // 마지막 요소에 도착했을 때, currentIndex가 bookDetails.length - 1과 같으면 isReloadModal을 true로 설정한다.
        if (
          i === combinedScriptSounds.length - 1 &&
          currentIndex === bookDetails.length - 2 &&
          isPlay[currentIndex]
        ) {
          setIsReloadModal(true);
        }
      }
    };

    playSounds();

    return () => {
      isPlay[currentIndex] = false; // false 처리해서 currentIndex가 바뀌기 전에 존재하던 반복문에 대한 재생을 멈추는 flag로 사용
      if (soundObjectRef.current) {
        soundObjectRef.current.stopAsync(); // 재생중이던 사운드 멈추고 unload
        soundObjectRef.current.unloadAsync();
      }
    };
  }, [currentIndex, bookDetails]);

  /**
   * 컴포넌트가 마운트 되었을 때 실행 됨
   * 내가 만든 뚝딱동화의 상세 정보(각 페이지들의 정보)를 불러오고 bookDetails에 set해줌
   * 또한 현재 재생중인 flag를 나타낼 isPlay 배열도 배열 길이에 맞게 초기화 해줌
   */
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getMakeBookDetail(makeBookId);
        setIsPlay(new Array(response.bookDetail.length).fill(false));
        setBookDetails(response.bookDetail);

        // console.log(response.bookDetail[0]);
      } catch (error) {
        console.error('Failed', error);
      }
    };

    fetchBookDetails();
  }, [makeBookId]);

  if (!bookDetails) {
    return <Text>Loading...</Text>;
  }

  /**
   * 책 안쪽 부분의 페이지 영역들을 렌더링 하는 함수
   * 위쪽의 bookInnerContainer는 왼쪽 페이지 아래쪽의 bookInnerContainer는 오른쪽 페이지
   */
  const pageRendering = () => {
    if (bookDetails.length === 0) {
      return null;
    }

    return (
      <Animated.View style={[styles.bookFrameContainer, { opacity: fadeAnim }]}>
        <View style={styles.bookFrameContainer}>
          <View style={styles.bookInnerContainer}>
            <Image
              style={styles.pageImage}
              source={{ uri: bookDetails[currentIndex].pageImage }}
              resizeMode="cover"
            />
            <Text style={styles.caption}>
              {bookDetails[currentIndex].pageDetail
                .map((detail) => detail.scriptContent)
                .join('\n')}
            </Text>
          </View>

          <View style={styles.bookInnerContainer}>
            <Image
              style={styles.pageImage}
              source={{ uri: bookDetails[currentIndex + 1].pageImage }}
              resizeMode="cover"
            />
            <Text style={styles.caption}>
              {bookDetails[currentIndex + 1].pageDetail
                .map((detail) => detail.scriptContent)
                .join('\n')}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  /**
   * 컴포넌트 렌더링 함수 imageContainer안에 위에서 선언한 pageRendering을 불러와서 페이지 인덱스를 기준으로 각 페이지를 렌더링
   * 이전, 다음 페이지로 가는 버튼은 buttonContainer에서 렌더링
   */
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{pageRendering()}</View>
      <View style={styles.buttonContainer}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={onPrevPress}>
            <Image
              source={require('../../assets/images/button/white_back_button.png')}
              style={styles.buttonImage}
            />
          </Pressable>
        </View>
        <View style={styles.nextButtonContainer}>
          <Pressable onPress={onNextPress}>
            <Image
              source={require('../../assets/images/button/white_back_button.png')}
              style={[styles.buttonImage, { transform: [{ scaleX: -1 }] }]}
            />
          </Pressable>
        </View>
      </View>
      <ReloadModal
        isVisible={isReloadModal}
        onRepeat={
          () => {
            setCurrentIndex(0);
            setIsReloadModal(false);
          } /* 다시읽기 버튼을 클릭하면 첫 페이지로 이동하면서 모달 닫기 */
        }
        onHome={
          () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'home' as never }],
            });
          } /* 홈으로 버튼이 클릭되었을 때 수행할 동작을 정의합니다 */
        }
      />
    </View>
  );
};

// 캡션을 최대 20자씩 나오도록 분할하는 함수
const splitCaption = (caption: string): string => {
  if (caption.length <= 20) return caption;
  const firstLine = caption.slice(0, 26);
  const remainingChars = caption.slice(26);
  if (remainingChars.length <= 26) {
    return firstLine + '\n' + remainingChars;
  } else {
    return firstLine + '\n' + splitCaption(remainingChars);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookcover: {
    position: 'absolute',
    bottom: 0, // bookInnerContainer의 하단에 위치하도록 조정
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'column',
    borderWidth: 2,
  },

  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    right: 520,
    bottom: 300,
  },
  nextButtonContainer: {
    position: 'absolute',
    left: 510,
    bottom: 300,
  },
  buttonImage: {
    width: 71,
    height: 107,
  },
  bookFrameContainer: {
    flexDirection: 'row',
    borderWidth: 2,
  },
  bookInnerContainer: {
    position: 'relative',
    height: '100%',
    width: 601,
    borderWidth: 1,
  },
  pageImage: {
    height: '100%',
    width: '100%',
  },
  caption: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0, // 이미지 아래에 위치
    width: 600, // 부모 요소에 꽉 차게 설정
    fontFamily: 'im-hyemin-bold',
    fontSize: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
  },
});

export default MakingBook;
