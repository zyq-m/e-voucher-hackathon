import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { TransactionItem, FilterList } from "../components";

import instanceAxios from "../lib/instanceAxios";
import { useTime, useUserContext } from "../hooks";
import { useFilterDate } from "../utils/filterDate";

import { globals, transactionStyle } from "../styles";

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

  const onCollapse = () => setCollapse(!collapse);

  const getTransactions = (id, token) => {
    return instanceAxios
      .get(`/api/transactions/cafe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data)
      .catch(err => console.error(err));
  };

  useEffect(async () => {
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

    const data = await getTransactions(user.id, user.secretToken);
    setTransactions(data);
  }, []);

  // useEffect(() => {
  //   filter.today && setTransactions(filterDate(transactions).today);
  //   filter.week && setTransactions(filterDate(transactions).week);
  //   filter.month && setTransactions(filterDate(transactions).month);

  //   console.log(transactions);
  // }, [filter]);

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
