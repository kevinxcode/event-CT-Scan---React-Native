import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "black",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "#000",
  },
  input: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0001c0",
    fontSize: deviceHeight < 710 ? 16 : 20,
  },
  inputInvalid: {
    backgroundColor: "#fcdcbf",
  },
});
