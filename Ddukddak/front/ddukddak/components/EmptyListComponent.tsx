import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

function EmptyListComponent() {
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
    width: width - 40,
    height: height * 0.75,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 20,
  },
});
