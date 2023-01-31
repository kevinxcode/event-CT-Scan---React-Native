import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import ListScreen from "./components/ListScreen";
import ScanScreen from "./components/Scanner";
import ResultScreen from "./components/ResultScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator  
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#025ef2' },
      headerLeft: null,
      headerBackButtonMenuEnabled: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    }}>
      <Stack.Screen name="HOME" component={HomeScreen} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="LIST_PAGE" component={ListScreen} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Scanner" component={ScanScreen}
        options={{
          title: 'Scan Activity',
        }} />
        <Stack.Screen name="RESULT" component={ResultScreen}
        options={{
          title: 'Result',
        }} />
      </Stack.Navigator>
      </NavigationContainer>
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
