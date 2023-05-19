import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ListScreen from "./components/ListScreen";
import ScanScreen from "./components/Scanner";
import ResultScreen from "./components/ResultScreen";
import AnimatedSplash from "react-native-animated-splash-screen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LandingPage" component={AuthenticatedStack} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#025ef2" },
        headerLeft: null,
        headerBackButtonMenuEnabled: {
          onChangeText: (event) => setSearch(event.nativeEvent.text),
        },
      }}
    >
      <Stack.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="LIST_PAGE"
        component={ListScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={ScanScreen}
        options={{
          title: "Scan Activity",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="RESULT"
        component={ResultScreen}
        options={{
          title: "Result",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer style={styles.rootScreen}>
      <StatusBar style="dark" />
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1800);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require("./assets/pics.png")}
      backgroundColor={"#0001c0"}
      logoHeight={600}
      logoWidth={300}
    >
      <Navigation />
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "white",
  },
});
