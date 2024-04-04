import { View, Image, StyleSheet } from 'react-native';

interface EmptyListComponentProps {
  // 비율을 결정할 prop을 추가
  // 이미지의 높이를 화면 높이의 75%로 기본값을 설정
  imageHeightRatio?: number;
}

function EmptyListComponent({}: EmptyListComponentProps) {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/emptyList.png')}
        style={styles.emptyImage}
      />
    </View>
  );
}

export default EmptyListComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyImage: {
    width: 700,
    height: 400,
    resizeMode: 'contain',
  },
});
