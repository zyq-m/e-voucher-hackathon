import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { dashboardStyle } from "../styles";

const Profile = ({ textField1, textField2, onLogout }) => {
  return (
    <View style={[profileStyle.profileContainer, profileStyle.bgWhite]}>
      <View>
        <Image
          style={profileStyle.profileImg}
          source={require("../assets/profile.png")}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 6 }}>
        <Text style={profileStyle.profileHeader}>{textField1}</Text>
        <Text style={profileStyle.profileSub}>{textField2}</Text>
      </View>
      <TouchableOpacity style={{ paddingRight: 6 }} onPress={onLogout}>
        <Image
          style={dashboardStyle.logoutIcon}
          source={require("../assets/icons/logout-icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const profileStyle = StyleSheet.create({
  bgWhite: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    borderRadius: 9,
    borderColor: "rgba(0, 0, 0, 0.11)",
    borderWidth: 1,
  },
  profileImg: {
    width: 58,
    height: 58,
  },
  profileHeader: {
    fontSize: 12,
    fontWeight: "600",
  },
  profileSub: {
    fontSize: 12,
  },
});

export default Profile;
