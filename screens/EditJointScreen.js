import { View, Text , StyleSheet, Button} from 'react-native'
import React from 'react'

const EditJointScreen = ({navigation}) => {

  const handleSubmit = () => {

  }

  return (
    <View>
      <Text>EditJointScreen</Text>
      <Button title="Complete" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})

export default EditJointScreen;