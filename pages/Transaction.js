import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import TransactionItem from "../components/TransactionItem";
import FilterList from "../components/FilterList";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks/useUserContext";
import { useTime } from "../hooks/useTime";

import globals from "../styles/globals";
import transactionStyle from "../styles/transactionStyle";

const Transaction = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useUserContext();
  const format = useTime();

  const onCollapse = () => setCollapse(!collapse);

  const getTransactions = (id, token) => {
    instanceAxios
      .get(`/api/transactions/cafe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={transactionStyle.row}>
          <TouchableOpacity onPress={onCollapse}>
            <Image
              style={transactionStyle.fitlerIcon}
              source={require("../assets/icons/filter-icon.png")}
            />
          </TouchableOpacity>
        </View>
      ),
    });

    getTransactions(user.id, user.secretToken);
  }, []);

  return (
    <View style={[globals.container, { paddingTop: 24 }]}>
      {transactions.map((data, i) => {
        const formater = format(data.created_at);

        return (
          <Wrapper key={i}>
            <TransactionItem
              field1={data.sender}
              time={formater.time}
              date={formater.date}
              amount={data.amount}
              cafe={true}
              noBorder={true}
            />
          </Wrapper>
        );
      })}

      {collapse && <FilterList onCollapse={onCollapse} />}
    </View>
  );
};

const Wrapper = ({ children }) => {
  return <View style={transactionStyle.transactionItemWrap}>{children}</View>;
};

export default Transaction;
