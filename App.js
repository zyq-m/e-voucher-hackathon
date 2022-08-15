import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import CafeDashboard from "./pages/CafeDashboard";
import PayNow from "./pages/PayNow";
import QRScan from "./pages/QRScan";
import Transaction from "./pages/Transaction";

import { UserContext } from "./lib/Context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({ id: undefined, login: false });

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Student Dashboard" component={StudentDashboard} />
          <Stack.Screen name="Cafe Dashboard" component={CafeDashboard} />
          <Stack.Screen
            name="Pay Now"
            component={PayNow}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="QR Scan"
            component={QRScan}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Transactions"
            component={Transaction}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
