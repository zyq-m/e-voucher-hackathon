import { useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useUserContext } from "../hooks";

const Refresh = ({ children }) => {
  const { setUser } = useUserContext();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUser(prev => ({ ...prev, refresh: true }));
    wait(2000).then(() => {
      setRefreshing(false);
      setUser(prev => ({ ...prev, refresh: false }));
    });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};

export default Refresh;
