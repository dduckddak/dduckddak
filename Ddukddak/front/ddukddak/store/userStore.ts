import { create } from 'zustand';


type UserState = {
  userName: string;
  sex: string;
  birth: string;
  firstLogin: boolean;
  updateUserData: (userData: Partial<UserState>) => void;
}


export const useUserStore = create<UserState>((set) => ({
  userName: '',
  sex: '',
  birth: '',
  firstLogin: false,
  updateUserData: (userData) => set((state) => ({ ...state, ...userData })),
}));
