import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Button from "../components/Button";

import globals from "../styles/globals";
import payNowStyle from "../styles/payNowStyle";

const PayNow = ({ navigation }) => {
  const [active, setActive] = useState({ btn1: true, btn2: false });

  const onActive = value => {
    if ("btn1" === value) {
      setActive({ btn1: true, btn2: false });
    }
    if ("btn2" === value) {
      setActive({ btn1: false, btn2: true });
    }
  };

  const onRoute = () => {
    alert("Payment successfull☑️");
  const onPay = () => {
    alert("Payment successfully☑️");
    navigation.navigate("Student Dashboard");
  };

  return (
    <View style={[globals.container]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
          Choose your amount
        </Text>
        <TouchableOpacity onPress={() => onActive("btn1")}>
          <Text
            style={[
              payNowStyle.textCenter,
              payNowStyle.payAmount,
              active.btn1 && payNowStyle.active,
            ]}
          >
            RM 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onActive("btn2")}>
          <Text
            style={[
              payNowStyle.textCenter,
              payNowStyle.payAmount,
              active.btn2 && payNowStyle.active,
            ]}
          >
            RM 2
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Pay Now"} onPress={onRoute} />
        <Button label={"Pay Now"} onAction={onPay} />
      </View>
    </View>
  );
};

export default PayNow;
