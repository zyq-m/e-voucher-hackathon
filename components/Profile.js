import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const Profile = ({ textField1, textField2 }) => {
  return (
    <View style={profileStyle.profileContainer}>
      <View
        style={[
          profileStyle.bgWhite,
          profileStyle.profileImgBorder,
          profileStyle.shadow,
        ]}
      >
        <Image
          style={profileStyle.profileImg}
          source={require("../assets/profile.png")}
        />
      </View>
      <View
        style={[
          profileStyle.bgWhite,
          profileStyle.profileTextContainer,
          profileStyle.shadow,
        ]}
      >
        <Text style={profileStyle.profileHeader}>{textField1}</Text>
        <Text style={profileStyle.profileSub}>{textField2}</Text>
      </View>
    </View>
  );
};

const profileStyle = StyleSheet.create({
  bgWhite: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 58,
    height: 58,
  },
  profileImgBorder: {
    padding: 6,
    borderRadius: 999,
  },
  profileTextContainer: {
    marginLeft: -16,
    paddingVertical: 11,
    paddingRight: 30,
    paddingLeft: 20,
    borderRadius: 9,
    zIndex: -1,
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
