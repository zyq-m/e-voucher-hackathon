import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

import Button from "./Button";
import FilterItem from "./FilterItem";

import filterStyle from "../styles/filterStyle";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Sayang
    </h1>
    <p>Tok generated pdf yerrrr HAHAHHAHAH</p>
    <p>♥♥</p>
  </body>
</html>
`;

const FilterList = ({ onCollapse, filterState }) => {
  const [list, setList] = useState([
    {
      id: 0,
      label: "Today",
      checked: true,
    },
    {
      id: 1,
      label: "Week",
      checked: false,
    },
    {
      id: 2,
      label: "Month",
      checked: false,
    },
  ]);

  const generatePDF = async () => {
    const { uri } = await printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const onList = id =>
    setList(prev =>
      prev.map(data => {
        if (data.id == id) {
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      })
    );

  useEffect(() => filterState(list), [list]);

  return (
    <View style={filterStyle.fitlerBackDrop}>
      <View style={filterStyle.filterContainer}>
        <View style={filterStyle.filterRow}>
          <TouchableOpacity onPress={onCollapse}>
            <Image
              style={{ width: 12, height: 12 }}
              source={require("../assets/icons/close-icon.png")}
            />
          </TouchableOpacity>
          <Text style={filterStyle.filterHeader}>Sort by</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {list.map(({ id, label, checked }) => (
            <FilterItem
              key={id}
              label={label}
              active={checked}
              onActive={() => onList(id)}
            />
          ))}
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button label={"Print"} onPress={generatePDF} />
        </View>
      </View>
    </View>
  );
};

export default FilterList;
