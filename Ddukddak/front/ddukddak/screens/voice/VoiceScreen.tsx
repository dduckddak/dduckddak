import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import GreenButton from '../../components/GreenButton';

const voiceData = [
  {
    id: 1,
    name: 'Voice 1',
    preview: 'Preview 1',
  },
  {
    id: 2,
    name: 'Voice 2',
    preview: 'Preview 2',
  },
  {
    id: 3,
    name: 'Voice 3',
    preview: 'Preview 3',
  },
  {
    id: 4,
    name: 'Voice 4',
    preview: 'Preview 4',
  },
  {
    id: 5,
    name: 'Voice 5',
    preview: 'Preview 5',
  },
];

function VoiceScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => console.log(item.name)}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <TouchableOpacity onPress={() => console.log('미리듣기 버튼')}>
            <Text style={styles.buttonText}>미리듣기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('삭제 버튼')}>
            <Text style={styles.buttonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/MainBackground.png')}
      style={styles.imageBackground}
    >
      <FlatList
        data={voiceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <GreenButton
        content="추가하기"
        onPress={() => navigation.navigate('addvoice' as never)}
      />
    </ImageBackground>
  );
}

export default VoiceScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#B7E29B',
    display: 'flex',
    width: 400,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardPreview: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
