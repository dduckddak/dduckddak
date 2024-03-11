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
import { useState } from 'react';
import GreenButton from './components/GreenButton';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator(); // 상단부 네비게이터를 위한 객체 선언

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <GreenButton
        onPress={handlePress}
        content="초록버튼"
        style={{ width: 200, height: 80 }}
      />
      <Button title="Go" onPress={() => navigation.navigate('test')} />
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

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
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
          <Stack.Screen name="test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
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
