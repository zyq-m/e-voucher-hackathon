import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import instanceAxios from "../lib/instanceAxios";
import { useTime, useUserContext } from "../hooks";
import { getValueFor } from "../utils/SecureStore";

import {
  Button,
  Profile,
  Amount,
  TransactionContainer,
  TransactionItem,
} from "../components";

import { globals, dashboardStyle } from "../styles";

const StudentDashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const format = useTime();
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState([]);

  const fetchUser = (id, token) => {
    instanceAxios
      .get(`/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.error(err));

    instanceAxios
      .get(`/api/transactions/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setTransactionData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getValueFor("accessToken").then(res => fetchUser(user.id, res));
  }, []);

  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <View style={dashboardStyle.logoutContainer}>
        {userData && (
          <Profile
            textField1={userData.student_name}
            textField2={userData.matric_no}
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
        {userData && (
          <Amount amount={parseInt(userData.wallet_amount)} student={true} />
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Pay"} onPress={() => navigation.navigate("Pay")} />
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/icons/more-icon.png")}
          />
        </View>
        <TransactionContainer>
          {transactionData &&
            transactionData.map((data, i) => {
              const formater = format(data.created_at);

              return (
                <TransactionItem
                  key={i}
                  field1={data.sender}
                  time={formater.time}
                  date={formater.date}
                  amount={data.amount}
                  noBorder={i == 0 && true}
                />
              );
            })}
        </TransactionContainer>
      </View>
    </View>
  );
};

export default StudentDashboard;
