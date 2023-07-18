import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableOpacity } from 'react-native'
import React , {useState, useEffect} from 'react'
import CustomImageCarousal from '../components/CustomImageCarousal'
import GIFCard from '../components/GIFCard'
import motionPreviewData from '../context/MotionPreviewData'


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


const MotionItem = ({item, onPress, backgroundColor}) => (
  <TouchableOpacity onPress={onPress} >
    <View style={[styles.card, {backgroundColor: backgroundColor}]}>
      <Image source={item.motion} style={{width: 100, height: 100}}/>
    </View>
    <Text style={{margin: 10, textAlign: 'center'}}>{item.name}</Text>
  </TouchableOpacity>
)

const HomeScreen = ({navigation}) => {

  // const [imageData, setImageData] = useState([]);
  const [gifData, setGifData] = useState([]);
  const [selected, setSelected] = useState();
  const [activated, setActivated] = useState(false);

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

  const renderItem = ({item}) => {
    const backgroundColor = item.name === selected ? '#fff' : "#ccc";
    return (
      <MotionItem
        item={item}
        onPress={() => {
          setSelected(item.name);
          setActivated(true);
        }}
        backgroundColor={backgroundColor}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.text}>My Characters</Text>
        <CustomImageCarousal data={activated === false? imageData : motionPreviewData} autoPlay={false} pagination={true} />
      </View>
      <View>
        <FlatList
          data={motionPreviewData}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.name}
          extraData={selected}
        />
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
  card: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
});

export default HomeScreen;