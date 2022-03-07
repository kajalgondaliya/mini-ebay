import Register from './modules/Register';
import Login from './modules/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewAllProducs from './modules/ViewAllProducs';
import PostProducts from './modules/PostProducts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='PostProducts' component={PostProducts} options={{ headerBackVisible: false }} />
        <Stack.Screen name='ViewAllProducs' component={ViewAllProducs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
