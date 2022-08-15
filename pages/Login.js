import React, { useState } from "react";

import { View, Text, TextInput, Image } from "react-native";
import axios from "axios";

import Button from "../components/Button";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks/useUserContext";
import { save, getValueFor } from "../utils/SecureStore";

import { View, Text, TextInput, StyleSheet, Image } from "react-native";


import globals from "../styles/globals";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);
  const [studentAcc, setStudentAcc] = useState("");
  const [cafeAcc, setCafeAcc] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const authUser = (id, secret, refresh) => {
    setUser({
      id: id,
      login: true,
      secretToken: secret,
      refreshToken: refresh,
    });
  };

  const onSubmit = () => {
    if (cafeOwner) {
      instanceAxios
        .post("/cafe/login", {
          username: cafeAcc,
          password: password,
        })
        .then(res => {
          authUser(cafeAcc, res.data.accessToken, res.data.refreshToken);
          navigation.navigate("Cafe Dashboard");
        })
        .catch(err => alert(err));
    } else {
      instanceAxios
        .post("/students/login", {
          matric_no: studentAcc,
          password: password,
        })
        .then(res => {
          authUser(studentAcc, res.data.accessToken, res.data.refreshToken);
          navigation.navigate("Student Dashboard");
        })
        .catch(err => alert(err));
    }
  };

  const onRoute = () => {
    if (cafeOwner) {
      navigation.navigate("Cafe Dashboard");
    } else {
  const onSubmit = () => {
    if (cafeOwner) {
      navigation.navigate("Cafe Dashboard");
    } else {
      navigation.navigate("Student Dashboard");
    }
  };

  return (
    <View style={[globals.container, { justifyContent: "center" }]}>
      <View>
        <Image
          style={loginStyle.logo}
          source={require("../assets/logo-unisza.png")}
        />
        <Text style={loginStyle.loginHeader}>Welcome Back</Text>
        {cafeOwner ? (
          <Input label={"Username |"} />
        ) : (
          <Input label={"Matric No. |"} />
        )}
        <Input label={"Password |"} secure={true} />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={onRoute} />
          <Button label={"Login"} onAction={onSubmit} />
        </View>
        <Text
          style={loginStyle.smallText}
          onPress={() => setCafeOwner(!cafeOwner)}
        >
          {cafeOwner ? "Are you a student?" : "Are you a cafe owner?"}
        </Text>
      </View>
    </View>
  );
};

const Input = ({ label, secure }) => {
  return (
    <View style={loginStyle.inputContainer}>
      <Text style={loginStyle.inputLabel}>{label}</Text>
      <TextInput
        style={loginStyle.input}
        secureTextEntry={secure ? true : false}
      />
    </View>
  );
};

const loginStyle = StyleSheet.create({
  loginHeader: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
  },
  logo: {
    width: 212,
    height: 99,
    marginHorizontal: "auto",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 9,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  inputLabel: {
    fontSize: 12,
    color: "rgba(160, 160, 160, 1)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  smallText: {
    marginTop: 21,
    color: "rgba(0, 0, 0, 0.62)",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Login;
