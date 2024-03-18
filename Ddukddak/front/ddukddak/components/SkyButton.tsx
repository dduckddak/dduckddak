import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface SkyButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  content: string;
}

const SkyButton: React.FC<SkyButtonProps> = ({ style, onPress, content }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? [styles.buttonstyle, styles.pressed] : styles.buttonstyle
        }
      >
        <View style={styles.buttonstyle}>
          <Text style={styles.text}>{content}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonstyle: {
    backgroundColor: '#DBF4FF',
    borderRadius: 5,
    elevation: 5,
    height: 50,
  },
  text: {
    color: 'rgb(45,45,45)',
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 30,
  },
});

export default SkyButton;
