import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface GreenButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  content: string;
}

const GreenButton: React.FC<GreenButtonProps> = ({
  style,
  onPress,
  content,
}) => {
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
    backgroundColor: '#139D78',
    borderRadius: 10,
    shadowColor: '#013b16',
    elevation: 20,
    shadowOpacity: 1,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    height: 65,
    textAlignVertical: 'center',
    fontSize: 30,
  },
});

export default GreenButton;
