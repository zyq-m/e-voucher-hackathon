import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";

import { Button, Refresh } from "../components";

import { useUserContext } from "../hooks";
import { getCafe, setTransactions } from "../lib/API";

import { globals, payNowStyle } from "../styles";

const CafeList = ({ navigation, route }) => {
  const { amount } = route.params;
  const { user } = useUserContext();

  const [radioBtn, setRadioBtn] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState('');

  const onSelected = i =>
    setRadioBtn(prev =>
      prev.map(data => {
        if (data.id == i) {
          setSelectedCafe(data.value);
          return { ...data, selected: true };
        } else {
          return { ...data, selected: false };
        }
      })
    );

  const onPress = () => {
    selectedCafe &&
      setTransactions({
        id: selectedCafe, data: {
          sender: user.id,
          amount: amount,
        }
      })
        .then(() => {
          alert("Payment successful👍");
          navigation.navigate("Dashboard");
        })
        .catch(err => {
          console.error(err);
          alert("Error occur");
          navigation.navigate("Dashboard");
        })
  };

  useEffect(() => {
    getCafe()
      .then(res => {
        let newArr = res.map((data, i) => ({
          id: i,
          label: data.cafe_name,
          value: data.username,
          selected: false,
        }));

        setRadioBtn(newArr);
      })
      .catch(() => alert("Please login again"))
  }, [user.refresh]);

  return (
    <View style={[globals.container]}>
      <Refresh>
        <View style={{ flex: 1, justifyContent: "center", marginVertical: 16 }}>
          <Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
            Choose cafe
          </Text>
          {radioBtn.map(({ id, label, value, selected }) => {
            return (
              <RadioButton
                key={id}
                id={id}
                label={label}
                value={value}
                selected={selected}
                labelStyle={{ fontSize: 16 }}
                containerStyle={{ marginTop: 16 }}
                onPress={() => onSelected(id)}
              />
            );
          })}
        </View>
      </Refresh>
      <View style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
        <Button label={"Confirm"} onPress={onPress} />
      </View>
    </View>
  );
};

export default CafeList;
