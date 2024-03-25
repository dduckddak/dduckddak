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
  Alert,
} from 'react-native';
import { Colors } from '../../components/Ui/styles';
import GreenButton from '../../components/GreenButton';
import { NavigationProp } from '@react-navigation/native';
import { login } from '../../api/userApi';

import * as SecureStore from 'expo-secure-store';

type Props = {
  navigation: NavigationProp<any>;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [idInput, setIdInput] = useState('');
  const [pwdInput, setPwdInput] = useState('');


  const validatePassword = (): boolean => {
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    const pwRegex = /^.{6,20}$/;

    if (!idRegex.test(idInput)) {
      Alert.alert(
        '오류',
        'ID는 한글과 특수문자를 포함할 수 없으며, 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }

    if (!pwRegex.test(pwdInput)) {
      Alert.alert('오류', '비밀번호는 최소 6자에서 최대 20자여야 합니다.');
      return false;
    }

    return true;
  };

  const handlePress = async () => {
    // 비밀번호 및 ID 유효성 검사
    if (!validatePassword()) {
      return;
    }

    try {
      const result = await login(idInput, pwdInput);
      const { accessToken, refreshToken, firstLogin } = result;

      if (!('accessToken' in result) || !('refreshToken' in result)) {
        Alert.alert('로그인 실패', '로그인 응답에서 토큰을 받지 못했습니다.');
        return;
      }
      console.log('로그인 성공:', result);

      if (typeof accessToken === 'string') {
        await SecureStore.setItemAsync('accessToken', accessToken);
      }
      if (typeof refreshToken === 'string') {
        await SecureStore.setItemAsync('refreshToken', refreshToken);
      }

      // 로그인 성공했을 떄, 첫 로그인이면 선호 책을 조사하는 페이지로 그 이외이면 메인 페이지로 이동
      if (firstLogin) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'likebooks' }],
        });
      } else {
        // 만약 인트로를 본 적 있는 디바이스라면 바로 main으로 아니라면 intro로 보내기
        const introChecked = await SecureStore.getItemAsync('introChecked');
        if (introChecked) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'intro' }],
          });
        }
      }


    } catch (error) {
      Alert.alert('로그인 실패', 'ID나 비밀번호를 확인해주세요.');
      console.error('로그인 에러:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background/background2.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/login.png')}
            style={styles.login}
          />
          <View style={[StyleSheet.absoluteFill]}>
            <View style={styles.TopContainer}>
              <View style={styles.flexContainer}>
                <Text style={[styles.text, { marginTop: 34 }]}>ID</Text>
                <TextInput
                  placeholder="아이디를 입력해주세요"
                  style={styles.inputContainer}
                  value={idInput}
                  onChangeText={(e) => setIdInput(e)}
                  accessibilityLabel="아이디 입력"
                />
              </View>
              <View style={styles.flexContainer}>
                <Text style={[styles.text, { marginTop: 34 }]}>PW</Text>
                <TextInput
                  placeholder="비밀번호를 입력해주세요"
                  style={styles.inputContainer}
                  value={pwdInput}
                  onChangeText={(e) => setPwdInput(e)}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View style={styles.middleContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('signup')}
                activeOpacity={0.5}
              >
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
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
  },
  login: {
    marginTop: 90,
    marginLeft: 330,
  },
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 25,
    marginRight: '2.2%',
    width: 100,
    textAlign: 'right',
  },
  inputContainer: {
    backgroundColor: '#E8E8E8',
    width: '42.5%',
    marginTop: 20,
    height: 60,
    paddingLeft: 20,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 16,
  },
  TopContainer: {
    paddingLeft: '27%',
    fontSize: 24,
    paddingTop: '20%',
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
