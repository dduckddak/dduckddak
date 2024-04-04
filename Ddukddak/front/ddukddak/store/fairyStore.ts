import { create } from 'zustand';
import { PhotoData, VoiceData } from '../types/types';

interface FairyStore {
  mainImage: PhotoData | null;
  mainVoice: VoiceData | null;
  subImage: PhotoData | null;
  subVoice: VoiceData | null;
  narration: VoiceData | null;

  setMainImage: (mainImage: PhotoData | null) => void;
  setSubImage: (subImage: PhotoData | null) => void;
  setMainVoice: (mainVoice: VoiceData | null) => void;
  setSubVoice: (subVoice: VoiceData | null) => void;
  setNarration: (narration: VoiceData | null) => void;
  resetStore: () => void;
}

export const useFairyStore = create<FairyStore>(set => ({
  mainImage: null,
  mainVoice: null,
  subImage: null,
  subVoice: null,
  narration: null,

  setMainImage: (mainImage) => set({ mainImage }),
  setSubImage: (subImage) => set({ subImage }),
  setMainVoice: (mainVoice) => set({ mainVoice }),
  setSubVoice: (subVoice) => set({ subVoice }),
  setNarration: (narration) => set({ narration }),

  resetStore: () => set({
    mainImage: null,
    mainVoice: null,
    subImage: null,
    subVoice: null,
    narration: null
  })

}));

// 스토어의 상태와 액션에 대한 인터페이스 정의
// interface StoreState {
//   mainImageIdx: number | null;
//   mainVoiceIdx: number | null;
//   subImageIdx: number | null;
//   subVoiceIdx: number | null;
//   narrationVoiceIdx: number | null;
//
//   setMainImageIdx: (idx: number | null) => void;
//   setMainVoiceIdx: (idx: number | null) => void;
//   setSubImageIdx: (idx: number | null) => void;
//   setSubVoiceIdx: (idx: number | null) => void;
//   setNarrationVoiceIdx: (idx: number | null) => void;
// }
//
// // FairyStore 정의
// const fairyStore = create<StoreState>((set) => ({
//   mainImageIdx: null,
//   mainVoiceIdx: null,
//   subImageIdx: null,
//   subVoiceIdx: null,
//   narrationVoiceIdx: null,
//
//   // 액션 구현
//   setMainImageIdx: (idx) => set({ mainImageIdx: idx }),
//   setMainVoiceIdx: (idx) => set({ mainVoiceIdx: idx }),
//   setSubImageIdx: (idx) => set({ subImageIdx: idx }),
//   setSubVoiceIdx: (idx) => set({ subVoiceIdx: idx }),
//   setNarrationVoiceIdx: (idx) => set({ narrationVoiceIdx: idx }),
// }));

export default useFairyStore;
