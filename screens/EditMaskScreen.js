import React, { useState, useRef } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Canvas, Path} from '@shopify/react-native-skia'
import { Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'
import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
import axios from 'axios';

const EditMaskScreen = () => {

  const [data, setData] = useState([]);

  const [color, setColor] = useState('#000000');
  const [stroke, setStroke] = useState(5);
  const [paths, setPaths] = useState([[]]);
  const viewShotRef = useRef(null);

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths.push([`M ${g.x} ${g.y}`]);
      setPaths(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      newPaths[index].push(`L ${g.x} ${g.y}`);
      setPaths(newPaths)
    })
    .minDistance(1)


  // const handleExport = async () => {
  //   try {
  //     const imageURI = await captureCanvas(viewShotRef.current);
  //     const fileName = 'updated_mask.png';
  //     const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  //     await RNFS.copyFile(imageURI, destinationPath);
  //     console.log('Image exported successfully:', destinationPath);
  //   } catch (error) {
  //     console.error('Error exporting image:', error);
  //   }
  // };


  // mask, texture, joint에 대한 정보 받아오기
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await axios.get('server address', {});
  //       setData(res.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, []);

  return (

    <View style={styles.container}>
      <View style={styles.textureContainer}>
        <Image source={require('../assets/dummy_texture.png')} style={styles.texture} resizeMode='contain' />
      </View>

      <GestureHandlerRootView style={styles.maskContainer} >
        {/* <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}> */}
          <View style={styles.imageContainer}>
            <Image source={require('../assets/dummy_mask.png')} style={styles.mask} resizeMode='contain' />
          </View>

          <View style={styles.canvasContainer}>
            <GestureDetector gesture={pan} >
                <Canvas style={styles.canvas} >
                  {paths.map((p, index) => (
                    <Path
                      key={index}
                      path={p.join(' ')}
                      strokeWidth={stroke}
                      style="stroke"
                      color={color} />
                  ))}
                </Canvas>
              </GestureDetector>
          </View>
        {/* </ViewShot> */}
      </GestureHandlerRootView>

      {/* <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
        <Text style={styles.exportButtonText}>Export Image</Text>
      </TouchableOpacity> */}
    </ View>
  )
}

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
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
    marginTop: 60,
    opacity: 0.5,
  },
  imageContainer: {
    flex: 1,
    zIndex: 1,
  },
  canvasContainer: {
    position: 'absolute',
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
  canvas : {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
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
})

export default EditMaskScreen;

// import React, { useState, useRef } from 'react';
// import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
// import { Canvas, Path } from '@shopify/react-native-skia';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// const EditMaskScreen = () => {
//   const [color, setColor] = useState('#000000');
//   const [stroke, setStroke] = useState(5);
//   const [paths, setPaths] = useState([[]]);
//   const canvasRef = useRef(null);

//   const handlePanStart = (gestureState) => {
//     const newPaths = [...paths];
//     newPaths.push([`M ${gestureState.x} ${gestureState.y}`]);
//     setPaths(newPaths);
//   };

//   const handlePanUpdate = (gestureState) => {
//     const index = paths.length - 1;
//     const newPaths = [...paths];
//     newPaths[index].push(`L ${gestureState.x} ${gestureState.y}`);
//     setPaths(newPaths);
//   };

//   const pan = Gesture.Pan().onStart(handlePanStart).onUpdate(handlePanUpdate).minDistance(1);

//   const handleExport = async () => {
//     try {
//       const imageURI = await captureCanvas(exportContainerRef.current);
//       const fileName = 'updated_mask.png';
//       const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
//       await RNFS.copyFile(imageURI, destinationPath);
//       console.log('Image exported successfully:', destinationPath);
//     } catch (error) {
//       console.error('Error exporting image:', error);
//     }
//   };

//   const captureCanvas = async (ref) => {
//     return new Promise((resolve, reject) => {
//       if (!ref) {
//         reject('Invalid ref provided');
//         return;
//       }

//       ref.capture().then((uri) => {
//         resolve(uri);
//       }).catch((error) => {
//         reject(error);
//       });
//     });
//   };

//   const exportContainerRef = useRef(null);

//   return (
//     <View style={styles.container}>
//       <View style={styles.textureContainer}>
//         <Image source={require('../assets/dummy_texture.png')} style={styles.texture} resizeMode='contain' />
//       </View>
//       <GestureHandlerRootView style={styles.maskContainer}>
//         <View style={styles.imageContainer}>
//           <Image source={require('../assets/dummy_mask.png')} style={styles.mask} resizeMode='contain' />
//         </View>
//         <View style={styles.canvasContainer}>
//           <GestureDetector gesture={pan}>
//             <Canvas ref={canvasRef} style={styles.canvas}>
//               {paths.map((p, index) => (
//                 <Path key={index} path={p.join(' ')} strokeWidth={stroke} style="stroke" color={color} />
//               ))}
//             </Canvas>
//           </GestureDetector>
//         </View>
//       </GestureHandlerRootView>

//       {/* The export container */}
//       <ViewShot ref={exportContainerRef} options={{ format: 'png', quality: 1 }} style={styles.exportContainer}>
//         <View style={styles.imageContainer}>
//           <Image source={require('../assets/dummy_mask.png')} style={styles.mask} resizeMode='contain' />
//         </View>
//         <View style={styles.canvasContainer}>
//           <Canvas style={styles.canvas}>
//             {paths.map((p, index) => (
//               <Path key={index} path={p.join(' ')} strokeWidth={stroke} style="stroke" color={color} />
//             ))}
//           </Canvas>
//         </View>
//       </ViewShot>

//       <TouchableOpacity onPress={handleExport} style={styles.exportButton}>
//         <Text style={styles.exportButtonText}>Export Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   textureContainer: {
//     position: 'absolute',
//     width: Dimensions.get('window').width,
//     height: undefined,
//     aspectRatio: 1,
//     marginTop: 60,
//   },
//   maskContainer: {
//     position: 'absolute',
//     width: Dimensions.get('window').width,
//     height: undefined,
//     aspectRatio: 1,
//     marginTop: 60,
//   },
//   imageContainer: {
//     flex: 1,
//     zIndex: 1,
//   },
//   canvasContainer: {
//     flex: 1,
//     zIndex: 2,
//   },
//   texture: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//   },
//   mask: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//   },
//   canvas: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//   },
//   exportContainer: {
//     position: 'absolute',
//     top: -10000,
//   },
//   exportButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 8,
//   },
//   exportButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default EditMaskScreen;