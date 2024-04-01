import { create } from 'zustand';
import { ImageRequireSource } from 'react-native';

interface TimeStore {
  backgroundSrc: ImageRequireSource;
  fontColor: string;

  setBackgroundSrc: (src: ImageRequireSource) => void;
  setFontColor: (color: string) => void;
}

export const useTimeStore = create<TimeStore>(set => ({
  backgroundSrc: require('../assets/images/background/morning.jpg'),
  fontColor: 'black',

  setBackgroundSrc: src => set({ backgroundSrc: src }),
  setFontColor: color => set({ fontColor: color}),
}));
export default useTimeStore;
