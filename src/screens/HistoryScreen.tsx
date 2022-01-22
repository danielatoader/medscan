import React from "react";
import { Text, StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import BackButton from "../components/header_icons/BackButton";
import { StatusBar } from 'expo-status-bar';

interface HistoryItem {
  medName: string;
  lasa: boolean;
  code: string;
  type: string;
}

const DATA: HistoryItem[] = [
  { medName: "Nils", lasa: false, code: "79261219h0s", type: "qr-s"},
  { medName: "Ethan", lasa: true, code: "380273283-0ie", type: "EAN-127" },
  { medName: "Ael", lasa: false, code: "deodhed920ud0n849d4d2084", type: "sm-2"},
];

//@ts-ignore
const HistoryScreen: React.FC = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
    });
  }, [navigation]);

  const renderItem: ListRenderItem<HistoryItem> = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.lasa ? "crimson" : "lightgreen" }]}>
      <Text style={styles.itemText}>{item.medName}</Text>
      <View style={{height: 10}}/>
      <Text>p. code: {item.code} ({item.type})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: HistoryItem) => item.medName}
      />
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
    alignItems: "center"
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 20
  }
})

export default HistoryScreen;
