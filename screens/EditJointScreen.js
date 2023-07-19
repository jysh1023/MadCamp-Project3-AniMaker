import { View, Text , StyleSheet, Dimensions, TouchableOpacity, Image, Button} from 'react-native'
import React from 'react'
import axios from 'axios';



const EditJointScreen = ({route, navigation}) => {
  const random_var = route.params
  console.log(random_var)
  const handleEdit = async () => {
    let formData = new FormData();
    formData.append("random_var", random_var);
    
    const response = await axios.post('http://172.10.9.50:80/joint_edit/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.status === "Joint editing completed") {

      console.log("Joint editing completed successfully.");
    } else {

      console.log("Joint editing failed.");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.step}>STEP 3</Text>
        <Text style={styles.title}>FINDING {'\n'}CHARACTER JOINT</Text>
        <Text style={styles.content}>캐릭터의 관절은 아래 예시처럼 표기됩니다.</Text>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>확인 후 정확하지 않은 관절의 위치를 수정해 주세요.</Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
          <Image source={require('../assets/icons/checklist.png')} style={{width: 20, height: 20, marginRight: 10}}/>
          <Text style={styles.checklistText}>이미지 마스크와 관절 수정이 끝나면 캐릭터의 애니메이션을 확인해 볼 수 있습니다!</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/sample_joint.png')} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>확인 및 수정</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HOME")}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20
  },
  textContainer: {
    flex: 0.3,
    width: Dimensions.get('window').width * 0.92,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    backgroundColor:"#fff",
    paddingVertical: 5,
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
})

export default EditJointScreen;