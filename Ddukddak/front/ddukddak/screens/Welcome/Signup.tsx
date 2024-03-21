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
import GreenButton from '../../components/GreenButton';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { signUp } from '../../api/userApi';

interface SignUpState {
  userId: string;
  password: string;
  confirmPassword: string;
  gender: string;
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
  const radioButtons: RadioButtonProps[] = [
    { id: '1', label: '남자아이', value: 'male' },
    { id: '2', label: '여자아이', value: 'female' },
  ];
  const [selectedId, setSelectedId] = useState<string | undefined>();

  // 사용자 입력 처리 함수
  const handleInputChange = (name: keyof SignUpState, value: string) => {
    setSignUpState({ ...signUpState, [name]: value });
  };

  // // onPress에서 선택된 라디오 버튼의 value를 직접 받는 경우의 처리
  // const handleGenderSelect = (selectedValue: string) => {
  //   setSignUpState((prevState) => ({ ...prevState, gender: selectedValue }));
  // };

  const validateInput = (): boolean => {
    const { userId, password, confirmPassword, gender, name, birthDate } =
      signUpState;
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;

    if (!idRegex.test(userId)) {
      Alert.alert(
        '⚠',
        '아이디는 한글이나 특수문자를 포함할 수 없으며, 최소 6자에서 최대 20자여야 합니다.',
      );
      return false;
    }
    const pwRegex = /^.{6,20}$/;
    if (!pwRegex.test(password)) {
      Alert.alert('⚠', '비밀번호는 최소 6자에서 최대 20자여야 합니다.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('⚠', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return false;
    }
    if (name === '' || birthDate === '') {
      Alert.alert('⚠', '모든 필드를 채워주세요.');
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
          sex: gender === 'male' ? 'M' : 'F',
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
                  style={styles.inputContainer}
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
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text style={[styles.text, { marginTop: 6 }]}>PW 확인</Text>
                <TextInput
                  placeholder="비밀번호 확인"
                  style={styles.inputContainer}
                  value={signUpState.confirmPassword}
                  onChangeText={(text) =>
                    handleInputChange('confirmPassword', text)
                  }
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text style={[styles.text, { marginTop: 5, marginBottom: 0 }]}>
                  생년월일
                </Text>
                <TextInput
                  placeholder="생년월일을 입력해주세요"
                  style={styles.inputContainer}
                  value={signUpState.birthDate}
                  onChangeText={(text) => handleInputChange('birthDate', text)}
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
