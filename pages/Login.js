import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { loginCafe, loginStudent } from "../lib/API";
import { useUserContext } from "../hooks";

import { Button, Input } from "../components";

import { globals, loginStyle } from "../styles";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);
  const [studentAcc, setStudentAcc] = useState("");
  const [cafeAcc, setCafeAcc] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const authUser = (id, student) => {
    setUser({
      id: id,
      login: true,
      student: student,
    });
  };

  const onSubmit = async () => {
    if (cafeOwner) {
      const res = await loginCafe({
        username: cafeAcc,
        password: password,
      });

      if (res) {
        authUser(cafeAcc, false);
        navigation.navigate("Cafe", { screen: "Cafe Dashboard" });
      } else {
        alert("Invalid username or password");
      }
    } else {
      const res = await loginStudent({
        matric_no: studentAcc,
        password: password,
      });

      if (res) {
        authUser(studentAcc, true);
        navigation.navigate("Student", { screen: "Student Dashboard" });
      } else {
        alert("Invalid matric no or password");
      }
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
          <Input label={"Username |"} value={cafeAcc} onChange={setCafeAcc} />
        ) : (
          <Input
            label={"Matric No. |"}
            value={studentAcc}
            onChange={setStudentAcc}
          />
        )}
        <Input
          label={"Password |"}
          secure={true}
          value={password}
          onChange={setPassword}
        />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={onSubmit} />
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

export default Login;
