import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import MainScreen from './screens/Welcome/MainScreen';
import MainCharacterScreen from './screens/maincharacter/MainCharacterScreen';
import DetailBookScreen from './screens/maincharacter/DetailBookScreen';
import TalkSceren from './screens/maincharacter/TalkScreen';
import FairytaleScreen from './screens/maincharacter/FairytaleScreen';
import MainRending from './screens/Rending/MainRending';
import Login from './screens/Welcome/Login';
import Signup from './screens/Welcome/Signup';
import PictureScreen from './screens/picture/PictureScreen';
import VoiceScreen from './screens/voice/VoiceScreen';
import MyCreateBookScreen from './screens/maincharacter/MyCreateBookScreen';

function LogoTitle() {
  return (
    <Image
      style={{ width: 270, height: 60, marginLeft: '53%' }}
      source={require('./assets/images/Logo.png')} // 로고 이미지
    />
  );
}

function LogoRight() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('./assets/images/Back.png')}
    />
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
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={MainScreen}
          options={{
            headerTitle: LogoTitle, // 가운데 로고부분
            // headerRight: LogoRight,
          }}
        />
        <Stack.Screen
          name="MainCharacterScreen"
          component={MainCharacterScreen}
        />
        <Stack.Screen name="detail" component={DetailBookScreen} />
        <Stack.Screen
          name="talk"
          component={TalkSceren}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="fairy"
          component={FairytaleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainrending"
          component={MainRending}
          options={{
            headerShown: false,
            headerTitle: LogoTitle, // 가운데 로고부분
            headerRight: LogoRight,
          }}
        />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="picture" component={PictureScreen} />
        <Stack.Screen name="voice" component={VoiceScreen} />
        <Stack.Screen name="mybook" component={MyCreateBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
