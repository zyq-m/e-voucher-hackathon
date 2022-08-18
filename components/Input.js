import { View, Text, TextInput } from "react-native";
import loginStyle from "../styles/loginStyle";

const Input = ({ label, secure, onChange, value }) => {
  return (
    <View style={loginStyle.inputContainer}>
      <Text style={loginStyle.inputLabel}>{label}</Text>
      <TextInput
        style={loginStyle.input}
        secureTextEntry={secure ? true : false}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default Input;
