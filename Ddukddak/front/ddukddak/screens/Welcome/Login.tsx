import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../components/Ui/styles';
import GreenButton from '../../components/GreenButton';

function Login({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const handlePress = () => {
    console.log('HomeScreen!');
  };
  // 비밀번호 유효성 검사
  const validatePassword = (text) => {
    // 비밀번호는 최소 6자 최대 20자이고, 특수 문자를 포함하지 않아도 됨.
    const limit = /^[a-zA-Z0-9]{6,20}$/;
    setIsValidPassword(limit.test(text));
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background2.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/login.png')}
            style={styles.login}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { paddingTop: StatusBar.currentHeight },
            ]}
          >
            <View style={styles.TopContainer}>
              <View style={styles.flexContainer}>
                <TextInput
                  placeholder="아이디를 입력해주세요"
                  style={styles.inputContainer}
                  value={id}
                  onChangeText={(e) => setId(e)}
                />
              </View>
              <TextInput
                placeholder="비밀번호를 입력해주세요"
                style={styles.inputContainer}
                value={password}
                onChangeText={(e) => validatePassword(e)}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.middleContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text>회원가입</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <Text>ID 찾기</Text>
              <Text>|</Text>
              <Text>Password 찾기</Text>
            </View>
            <View style={styles.bottomContainer}>
              <GreenButton
                onPress={handlePress}
                content="로그인"
                style={{ width: 170, height: 80 }}
              />
            </View>
          </View>
          <StatusBar style="light" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
  },
  login: {
    marginTop: 30,
    marginLeft: 330,
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'im-hyemin-bold',
  },
  inputContainer: {
    backgroundColor: '#E8E8E8',
    width: '50%',
    marginTop: 20,
    height: 60,
    paddingLeft: 20,
  },
  inputText: {
    fontSize: 16,
  },
  TopContainer: {
    paddingLeft: '37%',
    paddingTop: '15%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  middleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    paddingLeft: '40%',
    paddingTop: '2.5%',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2.5%',
  },
  button: {
    backgroundColor: Colors.green,
    width: 150,
    height: 65,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
