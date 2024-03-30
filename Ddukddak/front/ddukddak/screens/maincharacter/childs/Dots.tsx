import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { BookSummary } from '../../../types/types';

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
      marginTop: 0,
      bottom: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dot: {
      width: Dimensions.get('screen').width * 0.035,
      height: Dimensions.get('screen').width * 0.035,
      borderRadius: 100,
    },
  });
  const activeDotImage = require('../../../assets/images/active.png');
  const inactiveDotImage = require('../../../assets/images/inactive.png');

  return (
    <View style={styles.dotsContainer}>
      {bookList &&
        bookList.map((_, index) => (
          <Image
            key={index}
            source={index === currentPage ? activeDotImage : inactiveDotImage}
            style={styles.dot}
          />
        ))}
    </View>
  );
};

export default Dots;
