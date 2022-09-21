import { View, Image, Text, TouchableOpacity } from "react-native";
import filterStyle from "../styles/filterStyle";

const FilterItem = ({ label, active, onActive }) => {
  return (
    <TouchableOpacity onPress={onActive}>
      <View
        style={[
          filterStyle.filterRow,
          filterStyle.filterItemSpace,
          { justifyContent: "space-between" },
        ]}
      >
        <View style={[filterStyle.filterRow]}>
          <Image
            style={filterStyle.calenderIcon}
            source={require("../assets/icons/calender-icon.png")}
          />
          <Text style={filterStyle.filterItemTxt}>{label}</Text>
        </View>

        {active && (
          <Image
            style={filterStyle.checkedIcon}
            source={require("../assets/icons/checked-icon.png")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterItem;
