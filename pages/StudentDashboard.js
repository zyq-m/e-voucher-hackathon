import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks/useUserContext";

import Button from "../components/Button";
import Profile from "../components/Profile";
import Amount from "../components/Amount";
import TransactionContainer from "../components/TransactionContainer";
import TransactionItem from "../components/TransactionItem";

import globals from "../styles/globals";
import dashboardStyle from "../styles/dashboardStyle";

const StudentDashboard = ({ navigation }) => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState({
    student_name: "Ahmad Utat bin Abu",
    matric_no: "012345",
    wallet_amount: 150,
  });

  const fetchUser = (id, token) => {
    instanceAxios
      .get(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // fetchUser(user.id, user.secretToken);
  });

  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <View style={dashboardStyle.logoutContainer}>
        {userData && (
          <Profile
            textField1={userData.student_name}
            textField2={userData.matric_no}
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Image
            style={dashboardStyle.logoutIcon}
            source={require("../assets/icons/logout-icon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 24 }}>
        {userData && <Amount amount={userData.wallet_amount} student={true} />}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Pay"} onPress={() => navigation.navigate("QR Scan")} />
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
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            noBorder={true}
          />
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
          />
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
          />
        </TransactionContainer>
      </View>
    </View>
  );
};

export default StudentDashboard;
