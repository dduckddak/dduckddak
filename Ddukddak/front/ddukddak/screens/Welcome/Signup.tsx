import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import { Colors } from '../../components/Ui/styles';
import GreenButton from '../../components/GreenButton';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';

interface SignUpState {
  userId: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | '';
  name: string;
  birthDate: string;
}
const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [signUpState, setSignUpState] = useState<SignUpState>({
    userId: '',
    password: '',
    confirmPassword: '',
    gender: '',
    name: '',
    birthDate: '',
  });

  const checkUserId = (): boolean => {
    const isDuplicated = false; // 가정, 실제 앱에서는 서버 요청 필요
    if (isDuplicated) {
      Alert.alert('오류', '이미 존재하는 아이디입니다.');
      return false;
    }
    return true;
  };

  const validateInput = (): boolean => {
    const { userId, password, confirmPassword } = signUpState;
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    if (!idRegex.test(userId)) {
      Alert.alert(
        '오류',
        '아이디는 한글과 특수문자를 포함할 수 없으며, 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }
    if (!checkUserId()) {
      return false;
    }
    const pwRegex = /^.{6,20}$/;
    if (!pwRegex.test(password)) {
      Alert.alert('오류', '비밀번호는 최소 6자에서 최대 20자여야 합니다.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return false;
    }

    return true;
  };

  const handlePress = () => {
    if (validateInput()) {
      // 회원가입 로직
      navigation.navigate('Login');
    }
  };

  const radioButtons: RadioButtonProps[] = [
    {
      id: '1',
      label: '남자아이',
      value: 'male',
    },
    {
      id: '2',
      label: '여자아이',
      value: 'female',
    },
  ];

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  // 비밀번호 유효성 검사
  const validatePassword = (text: string) => {
    // 비밀번호는 최소 6자 최대 20자이고, 특수 문자를 포함하지 않아도 됨.
    const limit = /^[a-zA-Z0-9]{6,20}$/;
    setIsValidPassword(limit.test(text));
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.maxcontainer}>
      <ImageBackground
        source={require('../../assets/images/background2.png')}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/signup.png')}
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
                <Text
                  style={{
                    fontFamily: 'im-hyemin-bold',
                    fontSize: 27,
                    marginBottom: 5,
                    marginRight: '7%',
                  }}
                >
                  성별
                </Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout="row"
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontFamily: 'im-hyemin-bold',
                    fontSize: 27,
                    marginBottom: 5,
                    marginRight: '7%',
                  }}
                >
                  이름
                </Text>
                <TextInput
                  placeholder="이름을 입력해주세요"
                  style={styles.inputContainer}
                  value={name}
                  onChangeText={(e) => setName(e)}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontFamily: 'im-hyemin-bold',
                    fontSize: 27,
                    marginBottom: 5,
                    marginRight: '7%',
                  }}
                >
                  ID
                </Text>
                <TextInput
                  placeholder="ID를 입력해주세요"
                  style={styles.inputContainer}
                  value={id}
                  onChangeText={(e) => setId(e)}
                />
                <View>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontFamily: 'im-hyemin-bold',
                        fontSize: 27,
                        marginBottom: 5,
                        marginRight: '7%',
                      }}
                    >
                      PW
                    </Text>
                    <TextInput
                      placeholder="비밀번호를 입력해주세요"
                      style={styles.inputContainer}
                      value={password}
                      onChangeText={validatePassword}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontFamily: 'im-hyemin-bold',
                    fontSize: 27,
                    marginBottom: 5,
                    marginRight: '7%',
                  }}
                >
                  PW 확인
                </Text>
                <TextInput
                  placeholder="비밀번호 확인"
                  style={styles.inputContainer}
                  value={signUpState.confirmPassword}
                  onChangeText={(text) =>
                    setSignUpState({ ...signUpState, confirmPassword: text })
                  }
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontFamily: 'im-hyemin-bold',
                    fontSize: 27,
                    marginBottom: 5,
                    marginRight: '7%',
                  }}
                >
                  생년월일
                </Text>
                <TextInput
                  placeholder="생년월일을 입력해주세요"
                  style={styles.inputContainer}
                  value={signUpState.birthDate}
                  onChangeText={(text) =>
                    setSignUpState({ ...signUpState, birthDate: text })
                  }
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <GreenButton
                onPress={handlePress}
                content="회원가입"
                style={{ width: 170, height: 80 }}
              />
            </View>
          </View>
          <StatusBar />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  login: {
    marginLeft: 240,
    height: 600,
    flex: 1,
  },
  maxcontainer: {
    flex: 1,
  },
  TopContainer: {
    paddingLeft: '27%',
    paddingTop: '14.5%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginLeft: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'im-hyemin-bold',
  },
  inputContainer: {
    backgroundColor: '#E8E8E8',
    width: '50%',
    marginTop: 15,
    height: 50,
    paddingLeft: 15,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 25,
    fontFamily: 'im-hyemin-bold',
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
    marginTop: '0.8%',
  },
});

export default Signup;
