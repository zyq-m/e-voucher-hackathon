import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import TransactionDetail from "./pages/TransactionDetail";
import Dashboard from "./pages/Dashboard";

import PayNow from "./pages/PayNow";
import QRScan from "./pages/QRScan";
import CafeList from "./pages/CafeList";
import MyQRCode from "./pages/MyQRCode";

import { UserContext } from "./lib/Context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({
    id: undefined,
    login: false,
    student: false,
    refresh: false,
  });

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{ headerTitleAlign: "center", animation: "fade_from_bottom" }}>
          {user.login && (
            <>
              <Stack.Screen
                name="QR Scan"
                component={QRScan}
              />
              <Stack.Screen
                name="Pay"
                component={PayNow}
                options={{
                  title: "Choose amount",
                }}
              />
              <Stack.Screen
                name="Cafe List"
                component={CafeList}
                options={{
                  title: "Confirmation",
                }}
              />
              <Stack.Screen
                name="My QRCode"
                component={MyQRCode}
              />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Transactions"
                component={Transaction}
              />
              <Stack.Screen
                name="Transaction Details"
                component={TransactionDetail}
              />
            </>
          )}
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
