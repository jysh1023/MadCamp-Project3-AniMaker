import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, Button } from 'react-native'
import React , {useState, useEffect} from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import CustomImageCarousal from '../components/CustomImageCarousal'
import GIFCard from '../components/GIFCard'

const HomeScreen = ({navigation}) => {

  // const [imageData, setImageData] = useState([]);
  const [gifData, setGifData] = useState([]);
  const [motion, setMotion] = useState(false);

  const imageData = [
    {
      image : require('../assets/dummy_texture.png')
    },
    {
      image : require('../assets/dummy_texture.png')
    },
    {
      image : require('../assets/dummy_texture.png')
    },
  ]
  const gifPreview = [
    {
      motion: require('../assets/dummy_motion.gif')
    },
    {
      motion: require('../assets/dummy_motion.gif')
    },
    {
      motion: require('../assets/dummy_motion.gif')
    },
    {
      motion: require('../assets/dummy_motion.gif')
    },
    {
      motion: require('../assets/dummy_motion.gif')
    },
    {
      motion: require('../assets/dummy_motion.gif')
    }
  ]

    // texture, motion에 대한 정보 받아오기
    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const res = await axios.get('server address', {});
    //       setImageData(res.data.image)
    //       setGifData(res.data.gif)
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   getData();
    // }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.text}>My Characters</Text>
        <CustomImageCarousal data={imageData} autoPlay={false} pagination={true} />
      </View>
      <View>
        <FlatList data={gifPreview} horizontal renderItem={({item}) => <GIFCard item={item} />} />
      </View>
      <Button title="Add Drawing" onPress={()=> navigation.navigate('Add Drawing')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 10},
  carouselContainer: {
    marginBottom: 20,
  },
});

export default HomeScreen;