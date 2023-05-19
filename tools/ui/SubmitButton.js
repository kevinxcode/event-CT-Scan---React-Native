import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function SubmitButton({ onPress }) {
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../../assets/fonts/exo2-normal.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#000" }}
      >
        <Text style={styles.buttonText} onLayout={onLayoutRootView}>
          Login
        </Text>
      </Pressable>
    </View>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#0001C0",
    paddingTop: "1%",
    paddingBottom: "3%",
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "exo-2",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#000",
  },
});
