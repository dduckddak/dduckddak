import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const animationImages = [
  require('../assets/images/loading/6.png'),
  require('../assets/images/loading/7.png'),
  require('../assets/images/loading/8.png'),
  require('../assets/images/loading/9.png'),
  require('../assets/images/loading/10.png'),
  require('../assets/images/loading/11.png'),
];

const Loading = () => {
  const [imageNumber, setImageNumber] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    const countInterval = setInterval(() => {
      setImageNumber(count++ % animationImages.length);
    }, 100);
    return () => clearInterval(countInterval);
  }, []);

  return (
    <View style={styles.Container}>
      <Image source={animationImages[imageNumber]} key={imageNumber} />
      <Text style={styles.text}> 💚 조금만 기다려줘 💚</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    backgroundColor: 'rgb(157, 202, 166)',
    borderRadius: 1000,
    padding: 70,
    width: '40%',
    marginTop: 70,
  },
  text: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 30,
  },
});
