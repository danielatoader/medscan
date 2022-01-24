import React, { useMemo, useState } from "react";
import { Text, StyleSheet, FlatList, View, ListRenderItem } from "react-native";
import BackButton from "../components/header_icons/BackButton";
import { StatusBar } from "expo-status-bar";
import {
  lasa_history,
  LasaHistoryItem,
  patient_med_history,
  PatientMedHistoryItem,
} from "../history";

//@ts-ignore
const HistoryScreen: React.FC = ({ route, navigation }) => {
  const { lasaScan } = route.params;
  const history = lasaScan ? lasa_history : patient_med_history;
  const [items, setItems] = useState<
    LasaHistoryItem[] | PatientMedHistoryItem[]
  >(history);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
    });
  }, [navigation]);

  useMemo(() => {
    setItems(history);
  }, [history]);

  const renderLasaItem: ListRenderItem<LasaHistoryItem> = ({ item }) => {
    return (
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
  };
  const renderPatientMedItem: ListRenderItem<PatientMedHistoryItem> = ({
    item,
  }) => {
    return (
      <View
        style={[
          styles.item,
          { backgroundColor: item.match ? "lightgreen" : "crimson" },
        ]}
      >
        <Text style={{ color: item.match ? "black" : "white" }}>
          {item.timestamp}
        </Text>
        <View style={{ height: 10 }} />

        <Text style={{ color: item.match ? "black" : "white" }}>med. </Text>
        <Text
          style={[styles.itemText, { color: item.match ? "black" : "white" }]}
        >
          {item.medName}
        </Text>

        <View style={{ height: 10 }} />

        <Text style={{ color: item.match ? "black" : "white" }}>pat. </Text>
        <Text
          style={[styles.itemText, { color: item.match ? "black" : "white" }]}
        >
          {item.patientName}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />
        {lasaScan ? (
          <FlatList
            ListEmptyComponent={NothingToShow}
            data={history as LasaHistoryItem[]}
            renderItem={renderLasaItem}
            keyExtractor={(item: LasaHistoryItem, index) =>
              item.timestamp + String(index)
            }
          />
        ) : (
          <FlatList
            ListEmptyComponent={NothingToShow}
            data={history as PatientMedHistoryItem[]}
            renderItem={renderPatientMedItem}
            keyExtractor={(item: PatientMedHistoryItem, index) =>
              item.timestamp + String(index)
            }
          />
        )}
      </View>
      <View style={{ height: 15 }} />
    </>
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
    textAlign: "center",
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
