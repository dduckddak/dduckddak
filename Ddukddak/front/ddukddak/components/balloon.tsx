import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const animationImages = [
  require('../assets/images/coloring/balloon1.png'),
  require('../assets/images/coloring/balloon2.png'),
  require('../assets/images/coloring/balloon3.png'),
];

const Balloons = () => {
  const [imageNumber, setImageNumber] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    let countInterval = setInterval(() => {
      setImageNumber(count++ % 3);
    }, 50000 / 20);

    return () => clearInterval(countInterval);
  }, []);

  return (
    <View style={styles.Container}>
      <Image source={animationImages[imageNumber]} key={imageNumber} />
    </View>
  );
};

export default Balloons;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
  },
});
