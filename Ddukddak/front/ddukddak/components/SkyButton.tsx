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
    borderRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 75,
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(45,45,45)',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 30,
  },
});

export default SkyButton;
