import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions} from 'react-native'
import React , {useState, useEffect} from 'react'
import CustomImageCarousal from '../components/CustomImageCarousal'
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
      <Image source={item.image} style={{width: 100, height: 100}}/>
    </View>
    <Text style={{margin: 10, textAlign: 'center'}}>{item.name}</Text>
  </TouchableOpacity>
)

const HomeScreen = ({navigation}) => {

  // const [imageData, setImageData] = useState([]);
  const [gifData, setGifData] = useState([]);
  const [selected, setSelected] = useState('none');
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
        onPress={() => setSelected(item.name)}
        backgroundColor={backgroundColor}
      />
    )
  }

  useEffect(() => {
    if(selected != 'none') {
      setActivated(true);
      const index = motionPreviewData.findIndex(o => o.name === selected);
      setGifData([motionPreviewData[index]]);
    } else {
      setActivated(false)
      setGifData([])
    }
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <CustomImageCarousal
        data={activated === false ? imageData : gifData}
        autoPlay={false}
        pagination={activated === false ? true : false} />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('Add Drawing')}>
          <Text style={styles.buttonText}>그림 추가하기</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'center',
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
  buttonContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor:"#fff",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'SCDream5'
  }
});

export default HomeScreen;