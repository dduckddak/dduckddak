import React, { useState, useEffect } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { signUp, checkUserIdDuplicate } from '../../api/userApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface SignUpState {
  userId: string;
  password: string;
  confirmPassword: string;
  gender: string;
  name: string;
  birthDate: string;
  isUserIdValid: boolean; // 아이디 유효성 검사 결과를 나타내는 상태
}

const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [signUpState, setSignUpState] = useState<SignUpState>({
    userId: '',
    password: '',
    confirmPassword: '',
    gender: '',
    name: '',
    birthDate: '',
    isUserIdValid: true, // 기본값은 true로 설정
  });
  const radioButtons: RadioButtonProps[] = [
    { id: '1', label: '남자아이', value: 'male' },
    { id: '2', label: '여자아이', value: 'female' },
  ];
  const [selectedId, setSelectedId] = useState<string | undefined>();

  useEffect(() => {
    // userId가 변경될 때마다 아이디 중복 검사!!
    checkUserId();
  }, [signUpState.userId]);

  const handleInputChange = (name: keyof SignUpState, value: string) => {
    setSignUpState({ ...signUpState, [name]: value });
    if (name === 'userId') {
      setSignUpState((prevState) => ({
        ...prevState,
        isUserIdValid: true, // userId가 변경될 때마다 유효성 검사 결과를 초기화
      }));
    }
  };

  const checkUserId = async () => {
    const { userId } = signUpState;
    if (!userId) return; // userId가 비어있으면 검사하지 않음
    try {
      const duplicatedres = await checkUserIdDuplicate(userId);
      if (!(duplicatedres.message === 'Success.')) {
        setSignUpState((prevState) => ({
          ...prevState,
          isUserIdValid: false, // 아이디가 중복되면 유효성 검사 결과를 false로 변경
        }));
      }
    } catch (error) {
      console.log('error', error);
      // 네트워크 오류 등으로 인한 중복 확인 실패 시
      Alert.alert(
        '⚠',
        '아이디 중복 확인을 할 수 없습니다. 나중에 다시 시도해주세요.',
      );
    }
  };

  const validateInput = (): boolean => {
    const { userId, password, confirmPassword, name, birthDate } = signUpState;
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    const pwRegex = /^.{6,20}$/;

    if (!idRegex.test(userId)) {
      Alert.alert(
        '아이디 오류',
        '아이디는 한글이나 특수문자를 포함할 수 없으며, 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }

    if (!pwRegex.test(password)) {
      Alert.alert(
        '비밀번호 오류',
        '비밀번호는 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        '비밀번호 오류',
        '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
      );
      return false;
    }

    if (name === '' || birthDate === '') {
      Alert.alert('필드 오류', '모든 필드를 채워주세요.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (validateInput()) {
      try {
        const { userId, password, gender, name, birthDate } = signUpState;
        const result = await signUp({
          userId,
          userPassword: password,
          userName: name,
          sex: selectedId === '1' ? 'M' : 'F',
          birth: parseInt(birthDate.replace(/-/g, ''), 10), //  "1990-01-01" -> 19900101
        });
        console.log(result); // 성공 결과를 처리합니다.
        navigation.navigate('login'); // 성공 시 로그인 화면으로 이동
      } catch (error) {
        Alert.alert('회원가입 실패', '회원가입 과정에서 문제가 발생했습니다.');
      }
    }
  };
  return (
    <SafeAreaView style={styles.maxcontainer}>
      <ImageBackground
        source={require('../../assets/images/background/background2.png')}
        style={styles.imageBackground}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          extraScrollHeight={12}
          enableOnAndroid={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Image
                source={require('../../assets/images/signup.png')}
                style={styles.signup}
              />
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { paddingTop: StatusBar.currentHeight },
                ]}
              >
                <View style={styles.TopContainer}>
                  <View style={styles.flexContainer}>
                    <Text style={[styles.text, { marginTop: 2 }]}>성별</Text>
                    <RadioGroup
                      radioButtons={radioButtons}
                      onPress={setSelectedId}
                      selectedId={selectedId}
                      layout="row"
                    />
                  </View>
                  <View style={[styles.flexContainer, { marginTop: 10 }]}>
                    <Text style={[styles.text, { marginTop: 10 }]}>이름</Text>
                    <TextInput
                      placeholder="이름을 입력해주세요"
                      style={styles.inputContainer}
                      value={signUpState.name}
                      onChangeText={(text) => handleInputChange('name', text)}
                    />
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={[styles.text, { marginTop: 6 }]}>ID</Text>
                    <TextInput
                      placeholder="ID를 입력해주세요"
                      style={[
                        styles.inputContainer,
                        !signUpState.isUserIdValid &&
                          styles.inputContainerError,
                      ]}
                      value={signUpState.userId}
                      onChangeText={(text) => handleInputChange('userId', text)}
                    />
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={[styles.text, { marginTop: 6 }]}>PW</Text>
                    <TextInput
                      placeholder="비밀번호를 입력해주세요"
                      style={styles.inputContainer}
                      value={signUpState.password}
                      onChangeText={(text) =>
                        handleInputChange('password', text)
                      }
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={[styles.text, { marginTop: 6 }]}>PW 확인</Text>
                    <TextInput
                      placeholder="비밀번호 확인을 위해 입력해주세요"
                      style={styles.inputContainer}
                      value={signUpState.confirmPassword}
                      onChangeText={(text) =>
                        handleInputChange('confirmPassword', text)
                      }
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={styles.flexContainer}>
                    <Text
                      style={[styles.text, { marginTop: 5, marginBottom: 0 }]}
                    >
                      생년월일
                    </Text>
                    <TextInput
                      placeholder="생년월일을 입력해주세요"
                      style={styles.inputContainer}
                      value={signUpState.birthDate}
                      onChangeText={(text) =>
                        handleInputChange('birthDate', text)
                      }
                    />
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <GreenButton
                    onPress={handleSignUp}
                    content="회원가입"
                    style={{ width: 170, height: 80 }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  signup: {
    marginLeft: 215,
    marginTop: 45,
    width: 800,
  },
  maxcontainer: {
    flex: 1,
  },
  TopContainer: {
    paddingLeft: '25%',
    paddingTop: '18%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginLeft: 50,
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
    width: '50%',
    marginBottom: 15,
    height: 50,
    paddingLeft: 15,
    borderRadius: 5,
  },
  inputContainerError: {
    borderColor: 'red',
    borderWidth: 1,
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
    marginTop: 5,
  },
});

export default Signup;
