import { Stack } from "../App";

import CafeDashboard from "../pages/CafeDashboard";
import Transaction from "../pages/Transaction";

const CafeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cafe Dashboard"
        component={CafeDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default CafeNav;
