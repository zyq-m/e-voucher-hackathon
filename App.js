import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import { StudentNav as Student, CafeNav as Cafe } from "./navigators";

import { UserContext } from "./lib/Context";

export const Stack = createNativeStackNavigator();

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
          screenOptions={{ headerShown: false }}
        >
          {user.login ? (
            <>
              {user.student ? (
                <Stack.Screen name="Student" component={Student} />
              ) : (
                <Stack.Screen name="Cafe" component={Cafe} />
              )}
              <Stack.Screen
                name="Transactions"
                component={Transaction}
                options={{
                  headerTitleAlign: "center",
                  headerShown: true
                }}
              />
            </>
          ) : (
            <Stack.Screen name="login" component={Login} />
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
