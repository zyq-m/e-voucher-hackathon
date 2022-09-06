import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import moment from "moment";

import { Refresh, TransactionItem, FilterList } from "../components";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks";
import { useFilterDate } from "../utils/filterDate";
import { getValueFor } from "../utils/SecureStore";

import { globals, transactionStyle } from "../styles";

const Transaction = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState([]);

  const { user } = useUserContext();
  const filterDate = useFilterDate();

  const onCollapse = () => setCollapse(prev => !prev);

  const getTransactions = (id, token) => {
    return instanceAxios
      .get(`/api/transactions/cafe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data)
      .catch(() => false);
  };

  useEffect(() => {
    const header = async () => {
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
    };

    header();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const token = await getValueFor("accessToken");
      const res = await getTransactions(user.id, token);

      res && setTransactions(res);
    };
    fetch();
  }, [user.refresh]);

  return (
    <View style={[globals.container]}>
      <Refresh>
        <View style={{ paddingBottom: 24 }}>
          {transactions &&
            transactions.map(({ sender, amount, created_at }, i) => {
              return (
                <View style={transactionStyle.transactionItemWrap} key={i}>
                  <TransactionItem
                    field1={sender}
                    time={moment(created_at).format("h.mma")}
                    date={moment(created_at).format("D-MM")}
                    amount={amount}
                    cafe={true}
                    noBorder={true}
                  />
                </View>
              );
            })}
        </View>
      </Refresh>
      {collapse && (
        <FilterList
          onCollapse={onCollapse}
          filterState={state => setFilter(state)}
        />
      )}
    </View>
  );
};

export default Transaction;
