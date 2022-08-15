import { StyleSheet, Dimensions } from "react-native";

const QRScanStyle = StyleSheet.create({
  square: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scanner: {
    marginHorizontal: "auto",
    width: "70%",
    height: "40%",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  barcode: {
    position: "absolute",
    width: "136%",
    height: Dimensions.get("screen").height,
  },
});

export default QRScanStyle;
