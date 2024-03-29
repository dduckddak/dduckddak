import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useBgmStore } from '../store/BgmStore'

export const BGMPlayer = () => {
    const bgmStore = useBgmStore();

    useEffect(() => {
        const loadBGM = async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require('../assets/sound/bgm4.mp3'));
                bgmStore.setBgmSound(soundObject);
                await soundObject.playAsync(); // 음악 재생 추가
                bgmStore.setIsPlaying(true); // 재생 상태 업데이트
                console.log("bgm");

                //반복 재생 설정
                await soundObject.setIsLoopingAsync(true);
            } catch (error) {
                console.error('Error loading BGM:', error);
            }
        };

        loadBGM();
        return () => {
            if (bgmStore.bgmSound) {
                bgmStore.bgmSound.unloadAsync();
                console.log("종료")
            }
        };
    }, []);
};

export default BGMPlayer;
