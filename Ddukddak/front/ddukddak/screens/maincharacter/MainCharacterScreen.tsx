import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('detail');
  };

  return (
    <View>
      <Button title="Go" onPress={handlePress} />
      <Text>MainCharacterScreen</Text>
    </View>
  );
};

export default MainCharacterScreen;
