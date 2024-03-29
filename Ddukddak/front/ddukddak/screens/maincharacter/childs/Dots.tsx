import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BookSummary } from '../../../App';

type DotsListProps = {
  bookList: BookSummary[];
  currentPage: number;
};

const Dots = ({ bookList, currentPage }: DotsListProps) => {
  const styles = StyleSheet.create({
    dotsContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '35%',
      marginTop: 10,
      bottom: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dot: {
      width: Dimensions.get('screen').width * 0.022,
      height: Dimensions.get('screen').width * 0.022,
      borderRadius: 100,
    },
    activeDot: {
      backgroundColor: '#254E5A',
    },
    inactiveDot: {
      backgroundColor: '#B3DABF',
    },
  });

  return (
    <View style={styles.dotsContainer}>
      {bookList &&
        bookList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentPage ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
    </View>
  );
};

export default Dots;
