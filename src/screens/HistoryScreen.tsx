import React, { useMemo, useState } from "react";
import { Text, StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import BackButton from "../components/header_icons/BackButton";
import { StatusBar } from "expo-status-bar";
import history, { HistoryItem } from "../history";

//@ts-ignore
const HistoryScreen: React.FC = ({ navigation }) => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
    });
  }, [navigation]);

  useMemo(() => {
    setItems(history);
  }, [history]);

  const renderItem: ListRenderItem<HistoryItem> = ({ item }) => (
    <View
      style={[
        styles.item,
        { backgroundColor: item.medData.isLasa ? "crimson" : "lightgreen" },
      ]}
    >
      <Text style={{ color: item.medData.isLasa ? "white" : "black" }}>
        {item.timestamp}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.itemText,
          { color: item.medData.isLasa ? "white" : "black" },
        ]}
      >
        {item.medData.medicationName}
      </Text>
      <View style={{ height: 10 }} />
      <Text style={{ color: item.medData.isLasa ? "white" : "black" }}>
        p. code: {item.code} ({item.type})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        ListEmptyComponent={NothingToShow}
        data={history}
        renderItem={renderItem}
        keyExtractor={(item: HistoryItem, index) =>
          item.medData.medicationName + String(index)
        }
      />
    </View>
  );
};

const NothingToShow: React.FC = () => {
  return (
    <View style={styles.nothing}>
      <Text style={styles.nothingText}>No history yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  nothing: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  nothingText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "grey",
  },
});

export default HistoryScreen;
