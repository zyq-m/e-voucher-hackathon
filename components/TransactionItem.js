import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";

const TransactionItem = ({
  navigate,
  noBorder,
  field1,
  time,
  date,
  amount,
  cafe,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={navigate}
      style={[
        transactionItemStyle.transactionItem,
        noBorder ? "" : transactionItemStyle.transactionItemBorder,
      ]}>
      <View>
        <Text style={{ fontWeight: "500" }}>{field1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={transactionItemStyle.transactionSmallTxt}>{time}</Text>
          <Text
            style={[
              transactionItemStyle.transactionSmallTxt,
              { marginLeft: 12 },
            ]}>
            {date}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={transactionItemStyle.transactionAmount}>
          {cafe ? "+" : "-"}RM{amount}
        </Text>
        {cafe && (
          <TouchableOpacity>
            <CheckBox value={checked} onValueChange={setChecked} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const transactionItemStyle = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  transactionItemBorder: {
    borderTopColor: "rgba(0, 0, 0, 0.11)",
    borderTopWidth: 1,
  },
  transactionSmallTxt: {
    fontSize: 9,
    color: "rgba(0, 0, 0, 0.47)",
  },
  transactionAmount: {
    marginRight: 12,
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TransactionItem;
