import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle, Image } from 'react-native';
import { Colors } from './Ui/styles';

interface Props {
  isChecked: boolean;
  disabled?: boolean;
  onValueChangeHandler?: (checked: boolean) => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Radiobutton = (props: Props) => {
  const { isChecked, disabled, onValueChangeHandler, children, style } = props;

  const onPressedHandler = () => {
    if (onValueChangeHandler) {
      onValueChangeHandler(!isChecked);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        disabled={disabled}
        onPress={onPressedHandler}
        style={[
          styles.radiobox,
          isChecked && styles.checked,
          disabled && styles.disabled,
          isChecked && disabled && styles.checkedAndDisabled,
        ]}
      >
        {isChecked && (
          <Image source={require('../../assets/images/check.png')} />
        )}
      </Pressable>
      {children && <View style={styles.label}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  radiobox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Colors.green,
    borderColor: Colors.primary500,
  },
  disabled: {},
  checkedAndDisabled: {},
  label: {},
});

export default Radiobutton;
