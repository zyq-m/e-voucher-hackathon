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

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks";
import { getValueFor, deleteItem } from "../utils/SecureStore";

import { globals, dashboardStyle } from "../styles";

const CafeDashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  const getTransactions = (id, token) => {
    instanceAxios
      .get(`/api/cafe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.error(err));

    instanceAxios
      .get(`/api/transactions/cafe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        let total = 0;

        setTransactions(res.data);
        res.data.map(data => {
          total += parseInt(data.amount);
        });
        setTotal(total);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getValueFor("accessToken").then(token => getTransactions(user.id, token));
  }, [user.refresh]);

  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <Refresh>
        <View style={dashboardStyle.logoutContainer}>
          {userData && (
            <Profile
              textField1={userData.cafe_name}
              textField2={userData.username}
            />
          )}
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
              transactions.slice(0, 3).map(({ sender, created_at, amount }, i) => {
                return (
                  <TransactionItem
                    key={i}
                    field1={sender}
                    time={moment(created_at).format("h.mma")}
                    date={moment(created_at).format("D-MM")}
                    amount={amount}
                    noBorder={i == 0 && true}
                    cafe={true}
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
