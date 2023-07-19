import React, {useState, useEffect} from 'react';
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
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

const App = () =>  {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SCDream1' : require('./assets/fonts/SCDream1.otf'),
        'SCDream2' : require('./assets/fonts/SCDream2.otf'),
        'SCDream3' : require('./assets/fonts/SCDream3.otf'),
        'SCDream4' : require('./assets/fonts/SCDream4.otf'),
        'SCDream5' : require('./assets/fonts/SCDream5.otf'),
        'SCDream6' : require('./assets/fonts/SCDream6.otf'),
        'SCDream7' : require('./assets/fonts/SCDream7.otf'),
        'SCDream8' : require('./assets/fonts/SCDream8.otf'),
        'SCDream9' : require('./assets/fonts/SCDream9.otf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerTitleStyle:{ fontFamily: 'SCDream6', fontSize:20}}
        }>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{title:'AniMaker'}}/>
          <Stack.Screen name="Add Drawing" component={AddDrawingScreen} options={{title:'ADD DRAWING'}}/>
          <Stack.Screen name="Edit Mask" component={EditMaskScreen} options={{title:'ADD DRAWING'}}/>
          <Stack.Screen name="Edit Joint" component={EditJointScreen} options={{title:'ADD DRAWING'}}/>

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

export default App;