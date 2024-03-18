import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GreenButton from './components/GreenButton';
import MainCharacterScreen from './screens/maincharacter/MainCharacterScreen';
import DetailBookScreen from './screens/maincharacter/DetailBookScreen';
// import { StatusBar } from 'expo-status-bar';
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
import AppLoading from 'expo-app-loading';
import Login from './screens/Welcome/Login';
import Signup from './screens/Welcome/Signup';
import RendingTwo from './screens/Rending/RendingTwo';

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

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    console.log('버튼 눌러짐!');
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <Text>Home Screen</Text>
      <GreenButton onPress={handlePress} content="나버튼" />
      <Button
        title="Go"
        onPress={() => navigation.navigate('MainCharacterScreen')}
      />
      <GreenButton
        onPress={handlePress}
        content="초록버튼"
        style={{ width: 200, height: 80 }}
      />
      <Button
        title="랜딩페이지"
        onPress={() => navigation.navigate('mainrending')}
      />
      <Button title="로그인" onPress={() => navigation.navigate('login')} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>나 모달이야</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const [fontsLoaded] = useFonts({
    'im-hyemin': require('./assets/fonts/IM_Hyemin-Regular.ttf'),
    'im-hyemin-bold': require('./assets/fonts/IM_Hyemin-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
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
          component={HomeScreen}
          options={{
            headerTitle: LogoTitle, // 가운데 로고부분
          }}
        />

        {/* ------------------------ 내가 주인공 페이지 ------------------------ */}
        <Stack.Screen
          name="MainCharacterScreen"
          component={MainCharacterScreen}
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
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerRight: LogoRight,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
