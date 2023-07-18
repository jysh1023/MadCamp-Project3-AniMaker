import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const GIFCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.motion} style={{width: 100, height: 100}} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GIFCard;