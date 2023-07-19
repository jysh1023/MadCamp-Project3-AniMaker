import React, { useState, useEffect } from 'react';
import { Button, Image, View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AddDrawingScreen( {navigation} ) {
  const [image, setImage] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const pickImage = async () => {

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
    let result = await ImagePicker.launchCamera({
      allowsEditing:true,
    });


    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert('No image selected!')
    }
  }

  const handleSubmit = async() => {
    try {
      if (!image) {
        alert("Please select an image.");
        return;
      }
      console.log('서버에 이미지 요청을 보냅니다...');
      setSpinner(true);

      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/png',
      });

      await axios.post("http://172.10.9.14:80/upload_image/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(res => {
        console.log(res.data);
        setSpinner(false);
        alert('Image upload successful!');
        navigation.navigate('Edit Mask');
      })
      .catch(err => console.error(err));

    } catch (error) {
      alert('Error uploading image: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

      <View style={styles.textContainer}>
        <Text style={styles.step}>STEP 1</Text>
        <Text style={styles.title}>UPLOAD A DRAWING</Text>
        <Text style={styles.content}>팔과 다리가 겹치지 않는 하나의 캐릭터를 업로드합니다.</Text>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>가급적으로 깨끗한 흰 종이에 그린 그림을 촬영해 주세요.</Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>그림자를 최소화하기 위해 카메라를 멀리 두고 확대하여 촬영해 주세요.</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        ): (
            <Image source={require('../assets/sample_drawing.png')} style={styles.image} resizeMode="contain" />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../assets/icons/gallery.png')} style={styles.icon}/>
            <Text style={styles.buttonText}>갤러리</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../assets/icons/camera.png')} style={styles.icon}/>
            <Text style={styles.buttonText}>카메라</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>업로드</Text>
          </TouchableOpacity>
      </View>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: 'SCDream4'
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 60,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    backgroundColor:"#fff",
    paddingVertical: 6,
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 20,
    margin: 15
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'SCDream5',
    color: '#333',
    height: 25
  },
  textContainer: {
    flex: 0.3,
    width: Dimensions.get('window').width * 0.92,
  },
  step: {
    fontSize: 24,
    fontFamily: 'SCDream8',
    color: '#333',
  },
  title: {
    fontSize: 36,
    fontFamily: 'SCDream8',
    color: '#333',
    marginBottom: 5,
  },
  content: {
    fontSize: 17,
    fontFamily: 'SCDream4',
    color: '#333'
  },
  icon : {
    width: 25,
    height: 25,
    marginRight: 15
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    fontFamily:'SCDream4',
    color: '#333'
  }
});