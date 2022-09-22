import React, { useEffect, useState } from "react";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";

import { Button } from "../components";
import { getStudentTransactions } from "../lib/API";
import { getValueFor } from "../utils/SecureStore";
import { useUserContext } from "../hooks";

import { globals, payNowStyle } from "../styles";

const PayNow = ({ navigation }) => {
  const [active, setActive] = useState({ btn1: true, btn2: false });
  const [transactionDate, setTransactionDate] = useState([]);
  const { user } = useUserContext();

  const onActive = value => {
    if ("btn1" === value) {
      setActive({ btn1: true, btn2: false });
    }
    if ("btn2" === value) {
      setActive({ btn1: false, btn2: true });
    }
  };

  const onRoute = () => {
    let amount = 0;
    if (active.btn1) {
      amount = 1;
    } else {
      amount = 2;
    }

    transactionDate.length < 3
      ? navigation.navigate("QR Scan", { amount: amount })
      : alert("You only can make 3 transactions per day");
  };

  useEffect(() => {
    getValueFor("accessToken")
      .then(token =>
        getStudentTransactions(token, user.id).then(res => {
          const filtered = res.filter(
            data =>
              moment(data.created_at).format("D-MM-YY") ===
              moment().format("D-MM-YY")
          );

          setTransactionDate(filtered);
        })
      )
      .catch(() => console.log("Error"));
  }, []);

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
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
        <Button label={"Next"} onPress={onRoute} />
      </View>
    </View>
  );
};

export default PayNow;
