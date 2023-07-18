import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const GIFCard = ({ item, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={item.name === selected ? styles.selectedCard: styles.card}>
        <Image source={item.motion} style={{width: 100, height: 100}}/>
      </View>
      <Text style={{margin: 10, textAlign: 'center'}}>{item.name}</Text>
    </TouchableOpacity>

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
  selectedCard:{
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 10,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GIFCard;