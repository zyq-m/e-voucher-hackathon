import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";

import {
  Profile,
  Amount,
  TransactionContainer,
  TransactionItem,
  Refresh,
  Button,
} from "../components";

import { useUserContext } from "../hooks";
import { deleteItem } from "../utils/SecureStore";
import { useCafe } from "../hooks/useCafe";
import { useTransaction } from "../hooks/useTransaction";

import { globals, dashboardStyle } from "../styles";

const CafeDashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [total, setTotal] = useState(0);
  const { cafe } = useCafe({ id: user.id })
  const { transactions } = useTransaction({ id: user.id, refresh: user.refresh })

  const countTotal = () => {
    let temp = 0
    transactions.forEach(({ amount }) => {
      temp += parseInt(amount)
    });

    setTotal(temp)
  }

  useEffect(() => {
    transactions && countTotal()
  }, [transactions])

  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <Refresh>
        <View style={dashboardStyle.logoutContainer}>
          <Profile
            textField1={cafe[0]?.cafe_name}
            textField2={cafe[0]?.username}
          />
          <TouchableOpacity
            onPress={async () => {
              await deleteItem("accessToken");
              await deleteItem("refreshToken");
              setUser(prev => ({
                ...prev,
                id: undefined,
                login: false,
                student: false,
              }));
            }}
          >
            <Image
              style={dashboardStyle.logoutIcon}
              source={require("../assets/icons/logout-icon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 24 }}>
          <Amount amount={total} student={false} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button label={"My QRCode"} onPress={() => navigation.navigate("My QRCode")} />
        </View>
        <View style={{ marginTop: 40, marginBottom: 24 }}>
          <View style={[dashboardStyle.transactionHeaderWrap]}>
            <Text style={dashboardStyle.transactionHeader}>
              Recent transaction
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Transactions")}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/icons/more-icon.png")}
              />
            </TouchableOpacity>
          </View>
          <TransactionContainer>
            {transactions &&
              transactions.slice(0, 3).map(({ sender, amount, created_at, transaction_id, cafe_name, student_name }, i) => {
                let details = {
                  sender: `${student_name} (${sender})`,
                  recipient: cafe_name,
                  transactionId: transaction_id,
                  amount: `RM${amount}`,
                  date: `${moment(created_at).format("D-MM-YYYY")} at ${moment(created_at).format("h.mma")}`
                }

                return (
                  <TransactionItem
                    key={i}
                    field1={sender}
                    time={moment(created_at).format("h.mma")}
                    date={moment(created_at).format("D-MM")}
                    amount={amount}
                    noBorder={i == 0 && true}
                    cafe={true}
                    navigate={() => navigation.navigate("Transaction Details", { data: details })}
                  />
                );
              })}
          </TransactionContainer>
        </View>
      </Refresh>
    </View>
  );
};

export default CafeDashboard;
