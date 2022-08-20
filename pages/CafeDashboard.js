import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import {
  Profile,
  Amount,
  TransactionContainer,
  TransactionItem,
} from "../components";

import instanceAxios from "../lib/instanceAxios";
import { useTime, useUserContext } from "../hooks";

import { globals, dashboardStyle } from "../styles";

const CafeDashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const format = useTime();
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
    getTransactions(user.id, user.secretToken);
  }, []);

  return (
    <View style={[globals.container, { paddingTop: 22 }]}>
      <View style={dashboardStyle.logoutContainer}>
        {userData && (
          <Profile
            textField1={userData.cafe_name}
            textField2={userData.username}
          />
        )}
        <TouchableOpacity
          onPress={() =>
            setUser({ id: undefined, login: false, student: false })
          }
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
      <View style={{ marginTop: 40 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/icons/more-icon.png")}
            />
          </TouchableOpacity>
        </View>
        <TransactionContainer>
          {transactions &&
            transactions.map((data, i) => {
              const formater = format(data.created_at);

              return (
                <TransactionItem
                  key={i}
                  field1={data.sender}
                  time={formater.time}
                  date={formater.date}
                  amount={data.amount}
                  noBorder={i == 0 && true}
                  cafe={true}
                />
              );
            })}
        </TransactionContainer>
      </View>
    </View>
  );
};

export default CafeDashboard;
