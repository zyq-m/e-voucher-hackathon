import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PayNow from "../pages/PayNow";
import QRScan from "../pages/QRScan";
import CafeList from "../pages/CafeList";
import StudentDashboard from "../pages/StudentDashboard";

const Stack = createNativeStackNavigator();

const StudentNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Student Dashboard"
        component={StudentDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pay"
        component={PayNow}
        options={{
          title: "Choose amount",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="QR Scan"
        component={QRScan}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Cafe List"
        component={CafeList}
        options={{
          title: "Confirmation",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default StudentNav;
