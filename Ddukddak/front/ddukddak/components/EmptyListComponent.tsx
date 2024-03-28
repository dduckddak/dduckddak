import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');


interface EmptyListComponentProps {
  // 비율을 결정할 prop을 추가
  // 이미지의 높이를 화면 높이의 75%로 기본값을 설정
  imageHeightRatio?: number;
}


function EmptyListComponent({ imageHeightRatio = 0.75 }: EmptyListComponentProps) {
  const imageHeight = height * imageHeightRatio;


  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/emptyList.png')}
        style={{ ...styles.emptyImage, height: imageHeight }}
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
    width: width - 40,
    height: height * 0.75,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 20,
  },
});
