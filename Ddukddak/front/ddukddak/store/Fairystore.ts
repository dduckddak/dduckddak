import { create } from 'zustand';

// 스토어의 상태와 액션에 대한 인터페이스 정의
interface StoreState {
  mainImageUri: string | null;
  mainVoiceUri: string | null;
  mainVoiceName: string | null;
  rolesImageUri: string | null;
  rolesVoiceUri: string | null;
  rolesVoiceName: string | null;
  narrationVoiceUri: string | null;
  narrationVoiceName: string | null;
  bookName: string | null;
  selectedImageIndex: number | null;
  setMainImageUri: (uri: string) => void;
  setMainVoiceUri: (uri: string) => void;
  setMainVoiceName: (name: string) => void;
  setRolesImageUri: (uri: string) => void;
  setRolesVoiceUri: (uri: string) => void;
  setRolesVoiceName: (name: string) => void;
  setNarrationVoiceUri: (uri: string) => void;
  setNarrationVoiceName: (name: string) => void;
  setBookName: (name: string) => void;
  setSelectedImageIndex: (index: number | null) => void;
}

// Fairystore 정의
const Fairystore = create<StoreState>((set) => ({
  mainImageUri: null,
  mainVoiceUri: null,
  mainVoiceName: null,
  rolesImageUri: null,
  rolesVoiceUri: null,
  rolesVoiceName: null,
  narrationVoiceUri: null,
  narrationVoiceName: null,
  bookName: null,
  selectedImageIndex: null,
  // 액션 구현
  setMainImageUri: (uri) => set({ mainImageUri: uri }),
  setMainVoiceUri: (uri) => set({ mainVoiceUri: uri }),
  setMainVoiceName: (name) => set({ mainVoiceUri: name }),
  setRolesImageUri: (uri) => set({ rolesImageUri: uri }),
  setRolesVoiceUri: (uri) => set({ rolesVoiceUri: uri }),
  setRolesVoiceName: (name) => set({ mainVoiceUri: name }),
  setNarrationVoiceUri: (uri) => set({ narrationVoiceUri: uri }),
  setNarrationVoiceName: (name) => set({ mainVoiceUri: name }),
  setBookName: (name) => set({ bookName: name }),
  setSelectedImageIndex: (index) => set({ selectedImageIndex: index }),
}));

export default Fairystore;
