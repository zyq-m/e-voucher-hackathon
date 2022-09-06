import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import Button from "./Button";

import filterStyle from "../styles/filterStyle";

const FilterList = ({ onCollapse, filterState }) => {
  const [checked, setChecked] = useState({
    today: true,
    week: false,
    month: false,
  });

  const onChecked = item => {
    if (item === "today") {
      setChecked({
        today: true,
        week: false,
        month: false,
      });
    }
    if (item === "week") {
      setChecked({
        today: false,
        week: true,
        month: false,
      });
    }
    if (item === "month") {
      setChecked({
        today: false,
        week: false,
        month: true,
      });
    }
  };

  useEffect(() => filterState(checked), [checked]);

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
          <FilterItem
            label={"Today"}
            active={checked.today}
            onActive={() => onChecked("today")}
          />
          <FilterItem
            label={"Week"}
            active={checked.week}
            onActive={() => onChecked("week")}
          />
          <FilterItem
            label={"Month"}
            active={checked.month}
            onActive={() => onChecked("month")}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button label={"Print"} />
        </View>
      </View>
    </View>
  );
};

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

export default FilterList;
