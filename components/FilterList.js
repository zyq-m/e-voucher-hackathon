import { View, Image, Text, TouchableOpacity } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

import Button from "./Button";
import FilterItem from "./FilterItem";
import DocumentTemplate from "./DocumentTemplate";
import { useUserContext } from "../hooks";

import filterStyle from "../styles/filterStyle";

const FilterList = ({ onCollapse, list, onList, document }) => {
  const { user } = useUserContext()
  const generatePDF = async () => {
    const { uri } = await printToFileAsync({
      html: DocumentTemplate(document),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <TouchableOpacity activeOpacity={0} style={filterStyle.fitlerBackDrop} onPress={onCollapse}>
      <View style={filterStyle.filterContainer}>
        <View style={[filterStyle.filterRow, { paddingTop: 10 }]}>
          <TouchableOpacity onPress={onCollapse}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../assets/icons/close-icon.png")}
            />
          </TouchableOpacity>
          <Text style={filterStyle.filterHeader}>Sort by</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 32 }}>
          {list.map(({ id, label, checked }) => (
            <FilterItem
              key={id}
              label={label}
              active={checked}
              onActive={() => onList(id)}
            />
          ))}
        </View>
        {
          !(user.student) &&
          <View style={{ marginBottom: 20 }}>
            <Button label={"Print"} onPress={generatePDF} />
          </View>
        }
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;
