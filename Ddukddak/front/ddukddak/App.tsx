import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GreenButton from './components/GreenButton';
import MainCharacterScreen from './screens/maincharacter/MainCharacterScreen';
import DetailBookScreen from './screens/maincharacter/DetailBookScreen';
// import { StatusBar } from 'expo-status-bar';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Test from './screens/Test';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import MainRending from './screens/Rending/MainRending';

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
    console.log('HomeScreen!');
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
        title="테스트페이지"
        onPress={() => navigation.navigate('test')}
      />
      <Button
        title="랜딩페이지"
        onPress={() => navigation.navigate('mainrending')}
      />
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
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen
          name="mainrending"
          component={MainRending}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//     <View style={[styles.container, { flexDirection: 'column' }]}>
//       <View style={{ flex: 2 }}>
//         <Text>로고, 뒤로가기 버튼 </Text>
//       </View>
//       <View style={{ flex: 8 }}>
//         <Test />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
// });
