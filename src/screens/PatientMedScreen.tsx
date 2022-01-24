import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import HistoryButton from "../components/header_icons/HistoryButton";
import InfoButton from "../components/header_icons/InfoButton";
import NetworkStatus from "../components/NetworkStatus";
import { BarCodeScanner } from "expo-barcode-scanner";
import PatientMedTutorial from "../components/modals/PatientMedTutorial";
import Svg, { Path } from "react-native-svg";

//@ts-ignore
const PatientMedScreen: React.FC = ({ navigation }) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [tutorialVisible, setTutorialVisible] = useState(true);

  const setTutorial = (open: boolean) => {
    setTutorialVisible(open);
    setScanning(!open);
  };

  useEffect(() => {
    (async () => {
      Promise.all([BarCodeScanner.requestPermissionsAsync()]).catch((e) =>
        console.log(e)
      );
    })();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <InfoButton onPress={() => setTutorial(true)} />,
      headerRight: () => (
        <HistoryButton
          onPress={() => navigation.navigate("History", { lasaScan: false })}
        />
      ),
      headerTitle: () => <NetworkStatus />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {tutorialVisible ? (
        <PatientMedTutorial onClose={() => setTutorial(false)} />
      ) : null}
      <BarCodeScanner onBarCodeScanned={undefined} style={styles.scanner} />
      <View style={styles.card}>
        <Text style={styles.cardText}>Scan patient</Text>
      </View>
      <View style={styles.overlayIcon}>
        <Svg width={400} height={400}>
          <Path
            d="M100 100h200a20 20 0 0 1 20 20v200a20 20 0 0 1-20 20H100a20 20 0 0 1-20-20V120a20 20 0 0 1 20-20z"
            fill="none"
            stroke="tomato"
            strokeWidth={2}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    flex: 1,
    width: "100%",
    paddingTop: "0%",
    backgroundColor: "blue",
  },
  overlayIcon: {
    zIndex: 4,
    width: "60%",
    height: "60%",
    position: "absolute",
    alignItems: "center",
    opacity: 0.4,
  },
  card: {
    position: "absolute",
    top: 200,
    height: 30,
    backgroundColor: "tomato",
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  cardText: {
    color: "white",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default PatientMedScreen;
export const name = "Patient";
