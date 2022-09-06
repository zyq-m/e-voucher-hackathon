import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Refresh, TransactionItem, FilterList } from "../components";

import instanceAxios from "../lib/instanceAxios";
import { useTime, useUserContext } from "../hooks";
import { useFilterDate } from "../utils/filterDate";

import { globals, transactionStyle } from "../styles";
import { getValueFor } from "../utils/SecureStore";

const Transaction = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    today: false,
    week: false,
    month: false,
  });

  const { user } = useUserContext();
  const format = useTime();
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

  // useEffect(
  //   () =>
  //     ),
  //   []
  // );

  // useEffect(() => {
  //   filter.today && setTransactions(filterDate(transactions).today);
  //   filter.week && setTransactions(filterDate(transactions).week);
  //   filter.month && setTransactions(filterDate(transactions).month);

  //   console.log(transactions);
  // }, [filter]);

  return (
    <View style={[globals.container]}>
      <Refresh>
        <View style={{ paddingBottom: 24 }}>
          {transactions &&
            transactions.map((data, i) => {
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

const Wrapper = ({ children }) => {
  return <View style={transactionStyle.transactionItemWrap}>{children}</View>;
};

export default Transaction;
