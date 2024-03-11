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
          pressed ? [styles.green, styles.pressed] : styles.green
        }
      >
        <View style={styles.green}>
          <Text>{content}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  green: {
    backgroundColor: 'green',
  },
});

export default GreenButton;
