import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { BookSummary } from '../../../App';

type DotsListProps = {
  bookList: BookSummary[];
  currentPage: number;
};

const Dots = ({ bookList, currentPage }: DotsListProps) => {
  const styles = StyleSheet.create({
    dotsContainer: {
      flexDirection: 'row',
      width: '40%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      // borderWidth: 1,
      borderColor: 'green',
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
