import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Text, Touchable} from 'react-native';
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

      <View style={styles.textContainer}>
        <Text style={styles.step}>STEP 2</Text>
        <Text style={styles.title}>SEPARATING CHARACTER</Text>
        <Text style={styles.content}>캐릭터와 배경을 분리하여 밝은 부분으로 캐릭터를 표시하였습니다.</Text>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>캐릭터에 잘린 부분이 있다면 도구로 수정하세요.</Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>다리나 팔이 붙어 있다면 지우개로 분리시켜 주세요.</Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>수정사항이 있다면 "업데이트"를 누른 후 다음 단계로 진행해 주세요.</Text>
        </View>
      </View>

      <View style={styles.toolContainer}>
        <TouchableOpacity style={styles.toolButton} onPress={handleBack}>
          <Image source={require('../assets/icons/undo.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={handleReset}>
          <Text style={{fontFamily: 'SCDream5', fontSize: 15}}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={() => handleColorChange('#fff')}>
          <Image source={require('../assets/icons/add.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={() => handleColorChange('#000')}>
          <Image source={require('../assets/icons/remove.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor:'#fff', width: 20, height: 20, borderRadius: 50, margin: 5, elevation: 4}}
          onPress={() => handleWidthChange(5)}
        />

        <TouchableOpacity
          style={{backgroundColor:'#fff', width: 25, height: 25, borderRadius: 50, margin: 5, elevation: 4 }}
          onPress={() => handleWidthChange(10)}
        />

        <TouchableOpacity
          style={{backgroundColor:'#fff', width: 30, height: 30, borderRadius: 50, margin: 5, elevation: 4 }}
          onPress={() => handleWidthChange(15)}
        />
      </View>



      <View style={styles.viewShotContainer}>
        <View style={styles.textureContainer}>
          <Image source={require('../assets/dummy_texture.png')} style={styles.texture} resizeMode='contain' />
        </View>

        <GestureHandlerRootView style={{ opacity: 0.5,}}>
          <ViewShot ref={viewshotRef} style={styles.maskContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/dummy_mask.png')} style={styles.mask} resizeMode='contain' />
            </View>
            <View style={styles.canvasContainer}>
              <GestureDetector gesture={pan}>
                <Canvas ref={canvasRef} style={styles.canvas}>
                  {paths.map((p, index) => (
                    <Path key={index} path={p.path.join(' ')} strokeWidth={p.stroke} style="stroke" color={p.color} />
                  ))}
                </Canvas>
              </GestureDetector>
            </View>
          </ViewShot>
        </GestureHandlerRootView>

        {viewShotURI && (
          <View style={{width: 100, height: 100}}>
            <Text style={styles.previewText}>Updated Mask:</Text>
            <Image source={{ uri: viewShotURI }} style={{width: 100, height: 100}} />
          </View>
        )}
      </View>


    <View style={{width: Dimensions.get('window').width, position: 'absolute', bottom: 20}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onCapture} style={styles.button}>
          <Text style={styles.buttonText}>업데이트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Joint')}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
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
    // top: 70,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
  },
  maskContainer: {
    // top: 70,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
  },
  viewShotContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
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
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15
  },
  toolButton:{
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
    marginHorizontal: 5,
    justifyContent: 'center',
    padding: 5
  },
  textContainer: {
    width: Dimensions.get('window').width * 0.92,
  },
  step: {
    fontSize: 24,
    fontFamily: 'SCDream8',
    color: '#333',
  },
  title: {
    fontSize: 32,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    backgroundColor:"#fff",
    paddingVertical: 6,
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'SCDream5',
    color: '#333',
    height: 25
  }
});

export default EditMaskScreen;
