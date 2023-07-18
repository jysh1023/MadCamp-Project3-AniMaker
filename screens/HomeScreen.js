import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, Button } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import CustomImageCarousal from '../components/CustomImageCarousal'
import GIFCard from '../components/GIFCard'

const HomeScreen = ({navigation}) => {

  // const [data, setData] = useState([]);

  const data = [
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
  const gif = [
    // {
    //   motion: require('../assets/dummy_motion.gif')
    // },
    // {
    //   motion: require('../assets/dummy_motion.gif')
    // },
    // {
    //   motion: require('../assets/dummy_motion.gif')
    // }
  ]


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.text}>My Characters</Text>
        <CustomImageCarousal data={data} autoPlay={false} pagination={true} />
      </View>
      <View>
        <FlatList data={gif} horizontal renderItem={({item}) => <GIFCard item={item} />} />
      </View>
      <Button title="Add" onPress={()=> navigation.navigate('Add Character')}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  text: {textAlign: 'center', color: 'black', marginBottom: 10},
  carouselContainer: {
    marginBottom: 20,
  },
});

export default HomeScreen;