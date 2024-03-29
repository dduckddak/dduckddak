import { create } from 'zustand';
import { Audio } from 'expo-av';

interface BgmState {
  bgmSound: Audio.Sound | null;
  isPlaying: boolean | null;

  setBgmSound: (bgm: Audio.Sound | null) => void;
  setIsPlaying: (state: boolean | null) => void;
}

export const useBgmStore = create<BgmState>((set) => ({
  bgmSound: null,
  isPlaying: null,

  setBgmSound: (bgm) => set({ bgmSound: bgm }),
  setIsPlaying: (state) => set({ isPlaying: state }),
}));

export default useBgmStore;
