import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Text, Platform } from 'react-native';
import { Canvas, Path } from '@shopify/react-native-skia';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';

const EditMaskScreen = () => {
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

      <TouchableOpacity onPress={onCapture} style={styles.exportButton}>
        <Text style={styles.exportButtonText}>Export Image</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
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
          <Text style={styles.previewText}>Captured Canvas:</Text>
          <Image source={{ uri: viewShotURI }} style={{width: 200, height: 200}} />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});

export default EditMaskScreen;
