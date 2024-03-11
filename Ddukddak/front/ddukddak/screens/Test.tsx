import { StyleSheet, View } from 'react-native';
import SkyButton from '../components/SkyButton';

function Test() {
  const onPress = () => {
    console.log('Button pressed!');
  };

  return (
    <View>
      <SkyButton onPress={onPress} content="나 하늘버튼" style={styles.size} />
    </View>
  );
}
const styles = StyleSheet.create({
  size: {
    width: 500,
    height: 100,
  },
});

export default Test;
