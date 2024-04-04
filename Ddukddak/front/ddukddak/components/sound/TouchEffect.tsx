import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

const useTouchEffect = () => {
  const [touchSound, setTouchSound] = useState<Audio.Sound>();

  const duck = require('../../assets/sound/Duck.mp3');
  const touch = require('../../assets/sound/Touch.mp3');
  const open = require('../../assets/sound/Open.mp3');
  const dduk = require('../../assets/sound/dduk.mp3');
  const ddak = require('../../assets/sound/ddak.mp3');
  const page = require('../../assets/sound/Page.mp3');

  const playTouch = async (effect: string) => {
    const soundObject = new Audio.Sound();

    if (effect === 'duck')
      await soundObject.loadAsync(duck);

    if (effect === 'touch')
      await soundObject.loadAsync(touch);

    if (effect === 'open')
      await soundObject.loadAsync(open);

    if (effect === 'M')
      await soundObject.loadAsync(dduk);

    if (effect === 'F')
      await soundObject.loadAsync(ddak);

    if (effect === 'page')
      await soundObject.loadAsync(page);


    setTouchSound(soundObject);
    await soundObject.playAsync();

  };

  useEffect(() => {
    return () => {
      if (touchSound) {
        touchSound.unloadAsync(); // 컴포넌트가 unmount될 때 사운드 객체 unload
      }
    };
  }, [touchSound]);

  return { playTouch };
};

export default useTouchEffect;
