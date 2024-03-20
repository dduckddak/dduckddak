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

type Props = {
  navigation: NavigationProp<any>;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [userId, setUserId] = useState<string>('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const handlePress = () => {
    console.log('버튼누름!');
    navigation.navigate('home');
  };
  // 비밀번호 유효성 검사
  const validatePassword = (): boolean => {
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    const pwRegex = /^.{6,20}$/;

    if (!idRegex.test(userId)) {
      Alert.alert(
        '오류',
        'ID는 한글과 특수문자를 포함할 수 없으며, 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }

    if (!pwRegex.test(password)) {
      Alert.alert('오류', '비밀번호는 최소 6자에서 최대 20자여야 합니다.');
      return false;
    }

    return true;
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
                  value={id}
                  onChangeText={(e) => setId(e)}
                  accessibilityLabel="아이디 입력"
                />
              </View>
              <View style={styles.flexContainer}>
                <Text style={[styles.text, { marginTop: 34 }]}>PW</Text>
                <TextInput
                  placeholder="비밀번호를 입력해주세요"
                  style={styles.inputContainer}
                  value={password}
                  onChangeText={(e) => setPassword(e)}
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
