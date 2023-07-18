import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import AddDrawingScreen from './screens/AddDrawingScreen';
import EditMaskScreen from './screens/EditMaskScreen';
import EditJointScreen from './screens/EditJointScreen';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
          {/* <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Drawing" component={AddDrawingScreen} />
          <Stack.Screen name="Edit Mask" component={EditMaskScreen} />
          <Stack.Screen name="Edit Joint" component={EditJointScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
