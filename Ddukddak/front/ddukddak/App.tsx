import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import GreenButton from './components/GreenButton';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import MainRending from './screens/MainRending';
import * as SplashScreen from 'expo-splash-screen';

import MainScreen from './screens/Welcome/MainScreen';
import MainCharacterScreen from './screens/maincharacter/MainCharacterScreen';
import DetailBookScreen from './screens/maincharacter/DetailBookScreen';
import TalkSceren from './screens/maincharacter/TalkScreen';
import FairytaleScreen from './screens/maincharacter/FairytaleScreen';
import Login from './screens/Welcome/Login';
import Signup from './screens/Welcome/Signup';
import PictureScreen from './screens/picture/PictureScreen';
import VoiceScreen from './screens/voice/VoiceScreen';
import MyCreateBookScreen from './screens/books/MyCreateBookScreen';
import AddVoiceScreen from './screens/voice/AddVoiceScreen';
import RecordScreen from './screens/voice/RecordScreen';

function LogoTitle() {
  return (
    <Image
      style={{ width: 270, height: 60, marginLeft: '53%' }}
      source={require('./assets/images/Logo.png')} // 로고 이미지
    />
  );
}

function LogoRight() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./assets/images/Back.png')}
      />
    </TouchableOpacity>
  );
}

// 페이지 만들고 props가 없으면 undefined로 있으면 값에 맞게 적어주기
// 아니면 에러는 안나지만 타입 빨간줄 뜹니다
export type RootStackParamList = {
  home: undefined;
  detail: { bookId: string };
  MainCharacterScreen: undefined;
  talk: undefined;
  fairy: undefined;
  mainrending: undefined;
  login: undefined;
  signup: undefined;
  picture: undefined;
  voice: undefined;
  mybook: undefined;
  addvoice: undefined;
  record: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const [fontsLoaded] = useFonts({
    'im-hyemin': require('./assets/fonts/IM_Hyemin-Regular.ttf'),
    'im-hyemin-bold': require('./assets/fonts/IM_Hyemin-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        // 여기서 모든 navigator 옵션 동일하게 지정해줄 수 있음
        screenOptions={{
          headerTransparent: true,
          // headerTitle: LogoTitle, 이건 넣고싶은 곳의 option에 추가해주면 됨
          // headerRight: LogoRight, 얘도
          headerBackVisible: false, // 뒤로가기 버튼 숨기기
          title: '',
        }}
      >
        {/* ------------------------ 제일 첫 화면 ------------------------ */}
        <Stack.Screen
          name="home"
          component={MainScreen}
          options={{
            headerTitle: LogoTitle, // 가운데 로고부분
          }}
        />

        {/* ------------------------ 내가 주인공 페이지 ------------------------ */}
        <Stack.Screen
          name="MainCharacterScreen"
          component={MainCharacterScreen}
          options={{ headerRight: LogoRight }}
        />

        {/* ------------------------ 책 상세 페이지 ------------------------ */}
        <Stack.Screen name="detail" component={DetailBookScreen} />

        {/* ------------------------ 렌더링 화면 ------------------------ */}
        <Stack.Screen name="mainrending" component={MainRending} />

        {/* ------------------------ 로그인 페이지 ------------------------ */}
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerRight: LogoRight,
          }}
        />

        {/* ------------------------ 회원가입 페이지 ------------------------ */}
        <Stack.Screen name="signup" component={Signup} />

        {/* ------------------------ 뚝딱대화 페이지 ------------------------ */}
        <Stack.Screen
          name="talk"
          component={TalkSceren}
          options={{ headerShown: false }}
        />

        {/* ------------------------ 동화뚝딱 페이지 ------------------------ */}
        <Stack.Screen
          name="fairy"
          component={FairytaleScreen}
          options={{ headerShown: false }}
        />

        {/* ------------------------ 사진뚝딱 페이지 ------------------------ */}
        <Stack.Screen
          name="picture"
          component={PictureScreen}
          options={{ headerRight: LogoRight }}
        />

        {/* ------------------------ 소리뚝딱 페이지 ------------------------ */}
        <Stack.Screen
          name="voice"
          component={VoiceScreen}
          options={{ headerRight: LogoRight }}
        />

        {/* ------------------------ 내가만든책 페이지 ------------------------ */}
        <Stack.Screen
          name="mybook"
          component={MyCreateBookScreen}
          options={{ headerRight: LogoRight }}
        />

        {/* ------------------------ 소리추가 페이지 ------------------------ */}
        <Stack.Screen name="addvoice" component={AddVoiceScreen} />

        {/* ------------------------ 녹음 페이지 ------------------------ */}
        <Stack.Screen name="record" component={RecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
