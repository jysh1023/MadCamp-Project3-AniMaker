import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// const PlaceholderImage = require('../assets/')

export default function AddDrawingScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async() => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
    });


    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert('No image selected!')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image}/>}
      </View>
      <View style={styles.buttonContainer} >
        <Button title="Gallery" onPress={pickImage} />
        <Button title="Camera" onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
    marginTop: 60
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  }
})