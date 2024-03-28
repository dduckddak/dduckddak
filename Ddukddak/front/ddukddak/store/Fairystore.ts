import { create } from 'zustand';

// 스토어의 상태와 액션에 대한 인터페이스 정의
interface StoreState {
  mainImageIdx: number | null;
  mainVoiceIdx: number | null;
  subImageIdx: number | null;
  subVoiceIdx: number | null;
  narrationVoiceIdx: number | null;
  bookName: string | null;

  setMainImageIdx: (idx: number | null) => void;
  setMainVoiceIdx: (idx: number | null) => void;
  setSubImageIdx: (idx: number | null) => void;
  setSubVoiceIdx: (idx: number | null) => void;
  setNarrationVoiceIdx: (idx: number | null) => void;
  setBookName: (name: string | null) => void;
}

// Fairystore 정의
const Fairystore = create<StoreState>((set) => ({
  mainImageIdx: null,
  mainVoiceIdx: null,
  subImageIdx: null,
  subVoiceIdx: null,
  narrationVoiceIdx: null,
  bookName: null,

  // 액션 구현
  setMainImageIdx: (idx) => set({ mainImageIdx: idx }),
  setMainVoiceIdx: (idx) => set({ mainVoiceIdx: idx }),
  setSubImageIdx: (idx) => set({ subImageIdx: idx }),
  setSubVoiceIdx: (idx) => set({ subVoiceIdx: idx }),
  setNarrationVoiceIdx: (idx) => set({ narrationVoiceIdx: idx }),
  setBookName: (name) => set({ bookName: name }),
}));

export default Fairystore;
