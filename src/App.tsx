import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

// redux
import { store } from './store';
import { Provider } from 'react-redux';

// type checking
export type RootStackParamList = {
  Home: undefined,
  Job:{job:Job},
  Login:undefined,
  Register:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{title:"Login",headerShown:false}}/>
          <Stack.Screen name='Register' component={Register} options={{title:"Register",headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{title:"My Jobs",headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
