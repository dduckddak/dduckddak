import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../App';
import { getUserInfo } from '../api/userApi';
import { useUserStore } from '../store/userStore';

export const AppInitializer: React.FC<{
  setInitialRouteName: React.Dispatch<React.SetStateAction<keyof RootStackParamList | undefined>>
}> = ({ setInitialRouteName }) => {

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        const userInfoRes = await getUserInfo();

        if (userInfoRes.message === 'Success.') {


          const userInfo = {
            birth: userInfoRes.birth,
            sex: userInfoRes.sex,
            userName: userInfoRes.userName,
          };
          useUserStore.getState().updateUserData(userInfo);
          setInitialRouteName('home');
        } else {
          setInitialRouteName('mainrending');
        }
      } else {
        setInitialRouteName('mainrending');
      }
    };

    checkToken();
  }, []);

  return null;
};
