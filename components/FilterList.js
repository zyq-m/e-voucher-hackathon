import { useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

import Button from "./Button";
import FilterItem from "./FilterItem";
import DocumentTemplate from "./DocumentTemplate";

import filterStyle from "../styles/filterStyle";

const FilterList = ({ onCollapse, list, onList, document }) => {
  const generatePDF = async () => {
    const { uri } = await printToFileAsync({
      html: DocumentTemplate(document),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

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
