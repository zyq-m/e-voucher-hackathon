import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={buttonStyle.button}>{label}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  button: {
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#FFD400",
    borderRadius: 9,
  },
});

export default Button;
