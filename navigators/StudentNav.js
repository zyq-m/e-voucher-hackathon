import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PayNow from "../pages/PayNow";
import QRScan from "../pages/QRScan";
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
        name="Pay Now"
        component={PayNow}
        options={{
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
    </Stack.Navigator>
  );
};

export default StudentNav;
