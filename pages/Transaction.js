import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import TransactionItem from "../components/TransactionItem";
import FilterList from "../components/FilterList";

import globals from "../styles/globals";
import transactionStyle from "../styles/transactionStyle";

const data = [
  {
    id: 1,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
  {
    id: 2,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
  {
    id: 3,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
  {
    id: 4,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
];

const Transaction = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => setCollapse(!collapse);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={transactionStyle.row}>
          {/* <TouchableOpacity>
            <Image
              style={transactionStyle.printIcon}
              source={require("../assets/icons/print-icon.png")}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onCollapse}>
            <Image
              style={transactionStyle.fitlerIcon}
              source={require("../assets/icons/filter-icon.png")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  return (
    <View style={[globals.container, { paddingTop: 24 }]}>
      {data.map(transaction => {
        return (
          <Wrapper key={transaction.id}>
            <TransactionItem
              field1={transaction.noMatric}
              time={transaction.time}
              date={transaction.date}
              amount={transaction.amount}
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
