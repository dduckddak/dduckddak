import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import GreenButton from './components/GreenButton';
import MainCharacterScreen from './screens/maincharacter/MainCharacterScreen';
import DetailBookScreen from './screens/maincharacter/DetailBookScreen';
import TalkSceren from './screens/maincharacter/TalkScreen';
import FairytaleScreen from './screens/maincharacter/FairytaleScreen';
import MainRending from './screens/Rending/MainRending';
import Login from './screens/Welcome/Login';
import Signup from './screens/Welcome/Signup';

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
          component={HomeScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
