import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// 이 아래는 페이지 이름들입니다
import MainRending from './screens/MainRending';
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
import ColoringScreen from './screens/coloring/ColoringScreen';
import ColoringDrawScreen from './screens/coloring/ColoringDrawScreen';
import ColoringListScreen from './screens/coloring/ColoringListScreen';
import ColoringDetailScreen from './screens/coloring/ColoringDetailScreen';
import MakingBook from './screens/books/MakingBook';
import LikeBooks from './screens/books/LikeBooks';
import Intro from './screens/Welcome/IntroScreen';
import LikeListScreen from './screens/maincharacter/LikeListScreen';
import AddFairyPicture from './screens/maincharacter/AddFairyPicture';
import AddFairyVoice from './screens/maincharacter/AddFairyVoice';

function LogoTitle() {
  return (
    <Image
      style={{ width: 270, height: 60, marginLeft: '53%' }}
      source={require('./assets/images/Logo.png')} // 로고 이미지
    />
  );
}
interface LogoRightProps {
  isHomeScreen: any;
}

function LogoRight({ isHomeScreen }: LogoRightProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    navigation.navigate('mainrending' as never);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshTocken');
  };

  if (isHomeScreen) {
    return (
      <TouchableOpacity onPress={handleLogout}>
        <Text
          style={{
            fontFamily: 'im-hyemin-bold',
            fontSize: 30,
            color: '#003C2A',
          }}
        >
          로그아웃
        </Text>
      </TouchableOpacity>
    );
  }

  // 그 외의 경우 뒤로 가기 버튼을 렌더링
  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={{ width: 80, height: 80 }}
        source={require('./assets/images/button/Back.png')}
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
  intro: undefined;
  login: undefined;
  signup: undefined;
  picture: undefined;
  voice: undefined;
  mybook: undefined;
  addvoice: undefined;
  record: undefined;
  coloring: undefined;
  coloringDraw: undefined;
  coloringList: undefined;
  coloringDetail: undefined;
  makingBook: { bookTitle: string };
  likebooks: { bookId: string };
  likeList: undefined;
  addfairypicture: { role: string };
  addfairyvoice: { role: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<
    keyof RootStackParamList | undefined
  >(undefined);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        setInitialRouteName('home');
      } else {
        setInitialRouteName('mainrending');
      }
      SplashScreen.hideAsync().catch(() => {});
    };

    checkToken();
  }, []);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          // 여기서 모든 navigator 옵션 동일하게 지정해줄 수 있음
          screenOptions={{
            headerTransparent: true,
            // headerTitle: LogoTitle, 이건 넣고싶은 곳의 option에 추가해주면 됨
            // headerRight: LogoRight, 얘도
            headerBackVisible: false, // 뒤로가기 버튼 숨기기
            title: '',
          }}
        >
          {/* ------------------------ 렌더링 화면 ------------------------ */}
          <Stack.Screen name="mainrending" component={MainRending} />
          {/* ------------------------ 로그인 페이지 ------------------------ */}
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 회원가입 페이지 ------------------------ */}
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 인트로 페이지 ------------------------ */}
          <Stack.Screen
            name="intro"
            component={Intro}
            options={{
              headerTitle: LogoTitle,
              headerRight: () => <LogoRight isHomeScreen={true} />,
            }}
          />
          {/* ------------------------ 메인 페이지 ------------------------ */}
          <Stack.Screen
            name="home"
            component={MainScreen}
            options={{
              headerTitle: LogoTitle,
              headerRight: () => <LogoRight isHomeScreen={true} />,
            }}
          />
          {/* ------------------------ 내가 주인공 페이지 ------------------------ */}
          <Stack.Screen
            name="MainCharacterScreen"
            component={MainCharacterScreen}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 책 상세 페이지 ------------------------ */}
          <Stack.Screen name="detail" component={DetailBookScreen} />
          {/* ------------------------ 맘에드는 책 고르는 페이지 ------------------------ */}
          <Stack.Screen
            name="likebooks"
            component={LikeBooks}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
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
          <Stack.Screen
            name="addfairypicture"
            component={AddFairyPicture}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="addfairyvoice"
            component={AddFairyVoice}
            options={{ headerShown: false }}
          />
          {/* ------------------------ 사진뚝딱 페이지 ------------------------ */}
          <Stack.Screen
            name="picture"
            component={PictureScreen}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 소리뚝딱 페이지 ------------------------ */}
          <Stack.Screen
            name="voice"
            component={VoiceScreen}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 내가만든책 페이지 ------------------------ */}
          <Stack.Screen
            name="mybook"
            component={MyCreateBookScreen}
            options={{
              headerTitle: LogoTitle,
              headerRight: () => <LogoRight isHomeScreen={false} />,
            }}
          />
          {/* ------------------------ 진짜 책 페이지 ------------------------ */}
          <Stack.Screen
            name="makingBook"
            component={MakingBook}
            options={{ headerRight: () => <LogoRight isHomeScreen={false} /> }}
          />
          {/* ------------------------ 소리추가 페이지 ------------------------ */}
          <Stack.Screen name="addvoice" component={AddVoiceScreen} />
          {/* ------------------------ 녹음 페이지 ------------------------ */}
          <Stack.Screen name="record" component={RecordScreen} />
          {/*  색칠뚝딱 페이지*/}
          <Stack.Screen
            name="coloring"
            component={ColoringScreen}
            options={{
              headerTitle: LogoTitle,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="coloringDraw"
            component={ColoringDrawScreen}
            options={{
              headerTransparent: true,
              headerTitle: LogoTitle,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="coloringList"
            component={ColoringListScreen}
            options={{
              headerTitle: LogoTitle,
              headerTransparent: true,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="coloringDetail"
            component={ColoringDetailScreen}
            options={{
              headerTitle: LogoTitle,
              headerTransparent: true,
              headerBackVisible: false,
            }}
          />
          {/*  좋아요 한 책 페이지*/}
          <Stack.Screen
            name="likeList"
            component={LikeListScreen}
            options={{
              headerTitle: LogoTitle,
              headerTransparent: true,
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
