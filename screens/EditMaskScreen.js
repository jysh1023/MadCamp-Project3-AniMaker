import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Text, Platform } from 'react-native';
import { Canvas, Path } from '@shopify/react-native-skia';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';

const EditMaskScreen = ({navigation}) => {
  const [color, setColor] = useState('#000000');
  const [stroke, setStroke] = useState(5);
  const [paths, setPaths] = useState([]);
  const [currentStrokeColor, setCurrentStrokeColor] = useState(color);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(stroke);
  const canvasRef = useRef(null);
  const viewshotRef = useRef();
  const [viewShotURI, setViewShotURI] = useState(null);

  const handlePanStart = (gestureState) => {
    setPaths([...paths, {path: [`M ${gestureState.x} ${gestureState.y}`], stroke: currentStrokeWidth, color: currentStrokeColor}])
  };

  const handlePanUpdate = (gestureState) => {
    const index = paths.length - 1;
    const newPaths = [...paths];
    newPaths[index].path.push(`L ${gestureState.x} ${gestureState.y}`);
    setPaths(newPaths);

  };

  const pan = Gesture.Pan().onStart(handlePanStart).onUpdate(handlePanUpdate).minDistance(1);

  const handleColorChange = (newColor) => {
    setCurrentStrokeColor(newColor);
  };

  const handleWidthChange = (newWidth) => {
    setCurrentStrokeWidth(newWidth);
  };

  const handleBack = () => {
    if (paths.length > 0) {
      setPaths(paths.slice(0, -1));
    }
  }

  const handleReset = () => {
    setPaths([]);
  }

  const onCapture = async () => {
    try {
      const uri = await captureRef(viewshotRef, {
        format: 'png',
        quality: 1,
      });

      console.log('Captured URI:', uri);
      setViewShotURI(uri);

    } catch (error) {
      console.error('Capture failed:', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* <View style={styles.textContainer}>
        <Text style={styles.step}>STEP 2</Text>
        <Text style={styles.title}>SEPARATING CHARACTER</Text>
        <Text style={styles.content}>팔과 다리가 겹치지 않는 하나의 캐릭터를 업로드합니다.</Text>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>가급적으로 깨끗한 흰 종이에 그린 그림을 촬영해 주세요.</Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>그림자를 최소화하기 위해 카메라를 멀리 두고 확대하여 촬영해 주세요.</Text>
        </View>
      </View> */}

      <View style={styles.textureContainer}>
        <Image source={require('../assets/dummy_texture.png')} style={styles.texture} resizeMode='contain' />
      </View>

      <GestureHandlerRootView style={{ opacity: 0.5,}}>
        <ViewShot ref={viewshotRef} style={styles.maskContainer}>
          <View style={styles.canvasContainer}>
            <GestureDetector gesture={pan}>
              <Canvas ref={canvasRef} style={styles.canvas}>
                {paths.map((p, index) => (
                  <Path key={index} path={p.path.join(' ')} strokeWidth={p.stroke} style="stroke" color={p.color} />
                ))}
              </Canvas>
            </GestureDetector>
          </View>

          <View style={styles.imageContainer}>
            <Image source={require('../assets/dummy_mask.png')} style={styles.mask} resizeMode='contain' />
          </View>
        </ViewShot>
      </GestureHandlerRootView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onCapture} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.toolContainer}>
        <Button title='back' onPress={handleBack}/>
        <Button title='reset' onPress={handleReset}/>
        <Button title='draw' onPress={() => handleColorChange('#fff')}/>
        <Button title='erase' onPress={() => handleColorChange('#000')}/>
        <Button title='5' onPress={() => handleWidthChange(5)}/>
        <Button title='10' onPress={() => handleWidthChange(10)}/>
        <Button title='15' onPress={() => handleWidthChange(15)}/>
      </View>

      {viewShotURI && (
        <View style={{width: 200, height: 200}}>
          <Text style={styles.previewText}>Updated Mask:</Text>
          <Image source={{ uri: viewShotURI }} style={{width: 200, height: 200}} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Joint')}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  textureContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
    marginTop: 60,
  },
  maskContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: 60,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
    zIndex: 1
  },
  canvasContainer: {
    flex: 1,
    zIndex: 2,
  },
  texture: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  mask: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  canvas: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  exportContainer: {
    position: 'absolute',
  },
  exportButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toolContainer: {
    flexDirection: 'row',
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
  checklistText: {
    flex: 1,
    fontSize: 15,
    fontFamily:'SCDream4',
    color: '#333'
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    bottom: 20,
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
  }
});

export default EditMaskScreen;
