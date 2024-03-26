import { create } from 'zustand';

// 스토어의 상태와 액션에 대한 인터페이스 정의
interface StoreState {
  mainImageUri: string | null;
  mainVoiceUri: string | null;
  rolesImageUri: string | null;
  rolesVoiceUri: string | null;
  narrationVoiceUri: string | null;
  bookName: string | null;
  selectedImageIndex: number | null;
  setMainImageUri: (uri: string) => void;
  setMainVoiceUri: (uri: string) => void;
  setRolesImageUri: (uri: string) => void;
  setRolesVoiceUri: (uri: string) => void;
  setNarrationVoiceUri: (uri: string) => void;
  setBookName: (name: string) => void;
  setSelectedImageIndex: (index: number | null) => void;
}

// useStore 정의
const Fairystore = create<StoreState>((set) => ({
  mainImageUri: null,
  mainVoiceUri: null,
  rolesImageUri: null,
  rolesVoiceUri: null,
  narrationVoiceUri: null,
  bookName: null,
  selectedImageIndex: null,
  // 액션 구현
  setMainImageUri: (uri) => set({ mainImageUri: uri }),
  setMainVoiceUri: (uri) => set({ mainVoiceUri: uri }),
  setRolesImageUri: (uri) => set({ rolesImageUri: uri }),
  setRolesVoiceUri: (uri) => set({ rolesVoiceUri: uri }),
  setNarrationVoiceUri: (uri) => set({ narrationVoiceUri: uri }),
  setBookName: (name) => set({ bookName: name }),
  setSelectedImageIndex: (index) => set({ selectedImageIndex: index }),
}));

export default Fairystore;
