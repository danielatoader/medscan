import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import HistoryButton from "../components/header_icons/HistoryButton";
import InfoButton from "../components/header_icons/InfoButton";
import NetworkStatus from "../components/NetworkStatus";
import MedicationData from "../models/MedicationData";
import ScanData from "../models/ScanData";
import { Audio } from "expo-av";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import PatientMedTutorial from "../components/modals/PatientMedTutorial";

//@ts-ignore
const PatientMedScreen: React.FC = ({ navigation }) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanData, setScanData] = useState<ScanData>({
    data: "",
    type: "",
    bounds: undefined,
  });
  const [medData, setMedData] = useState<MedicationData | undefined>(undefined);
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [lasaWarningVisible, setLasaWarningVisible] = useState(false);
  const okSound = new Audio.Sound();
  const lasaSound = new Audio.Sound();

  const setTutorial = (open: boolean) => {
    setTutorialVisible(open);
    setScanning(!open);
  };

  // const userFeedback = (lasa: boolean) => {
  //   animateOverlay();
  //   if (lasa) {
  //     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  //   } else {
  //     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  //   }
  //   playSound(lasa);
  // };

  useEffect(() => {
    (async () => {
      Promise.all([
        BarCodeScanner.requestPermissionsAsync(),
        Audio.requestPermissionsAsync(),
      ]).catch((e) => console.log(e));
    })();

    return () => {
      (async () => {
        Promise.all([okSound.unloadAsync(), lasaSound.unloadAsync()]);
      })();
    };
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <InfoButton onPress={() => setTutorial(true)} />,
      headerRight: () => (
        <HistoryButton onPress={() => navigation.navigate("History", {lasaScan: false})} />
      ),
      headerTitle: () => <NetworkStatus />,
    });
  }, [navigation]);

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
    bounds,
  }) => {
    if (scanData.bounds) return;
    setScanData({ bounds: bounds, data: data, type: type });
    // requestMedData({ bounds: bounds, data: data, type: type });
    setTimeout(() => {
      setScanData({ data: data, type: type, bounds: undefined });
    }, 2000);
    // animateBounds();
  };

  return (
    <View style={styles.container}>
      {tutorialVisible ? (
        <PatientMedTutorial onClose={() => setTutorial(false)} />
      ) : null}
      {/* <BarCodeScanner
        onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
        style={styles.scanner}
      /> */}
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
});

export default PatientMedScreen;
export const name = "Patient";
