import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import HistoryButton from "../components/header_icons/HistoryButton";
import InfoButton from "../components/header_icons/InfoButton";
import NetworkStatus from "../components/NetworkStatus";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import PatientMedTutorial from "../components/modals/PatientMedTutorial";
import Svg, { Path } from "react-native-svg";
import ScanData from "../models/ScanData";
import { Audio } from "expo-av";
import API from "../server_communication/api";
import PatientMedData from "../models/PatientMedData";

//@ts-ignore
const PatientMedScreen: React.FC = ({ navigation }) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [scanData, setScanData] = useState<ScanData>({
    data: "",
    type: "",
    bounds: undefined,
  });
  const [patientScanned, setPatientScanned] = useState(false);
  const [patientMedData, setPatientMedData] = useState<PatientMedData | undefined>(undefined);

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

  const requestPatientMedData = () => {
    API.patientMedMatch(scanData.data, scanData.data).then((patient_med_data) => {
      setPatientMedData(patient_med_data);
    }, (err) => console.log(err));
  }

  const onScanned: BarCodeScannedCallback = ({ type, data, bounds }) => {
    if (scanData.bounds) return;
    setScanData({ bounds: bounds, data: data, type: type });
    animateBubble(patientScanned);
    setPatientScanned(true);
    // requestPatientMedData();
    setTimeout(() => {
      animateBubble(!patientScanned);
      setPatientScanned(false);
      setScanData({ bounds: undefined, data: data, type: type });
    }, 4000);
    animateBounds();
    animateOverlay();

    playSound(false);
  };

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

  const fadeOutBounds = useRef(new Animated.Value(1)).current;
  const fadeOutOverlay = useRef(new Animated.Value(0)).current;
  const moveBubble = useRef(new Animated.Value(-160)).current;

  const okSound = new Audio.Sound();
  const lasaSound = new Audio.Sound();

  const playSound = async (lasa: boolean) => {
    if (lasa) {
      await lasaSound.loadAsync(require("../../assets/lasa_sound.mp3"));
      await lasaSound.playAsync();
    } else {
      await okSound.loadAsync(require("../../assets/ok_sound.mp3"));
      await okSound.playAsync();
    }
  };

  const animateBounds = () => {
    fadeOutBounds.setValue(1);
    Animated.timing(fadeOutBounds, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const animateBubble = (up: boolean) => {
    Animated.timing(moveBubble, {
      toValue: up ? -160 : 150,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animateOverlay = () => {
    fadeOutOverlay.setValue(0.6);
    Animated.timing(fadeOutOverlay, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const setTutorial = (open: boolean) => {
    setTutorialVisible(open);
    setScanning(!open);
  };

  return (
    <View style={styles.container}>
      {tutorialVisible ? (
        <PatientMedTutorial onClose={() => setTutorial(false)} />
      ) : null}
      {scanData.bounds ? (
        <Animated.View
          style={[
            styles.highlight,
            {
              left: scanData.bounds.origin.x,
              top: scanData.bounds.origin.y,
              width: scanData.bounds.size.width,
              height: scanData.bounds.size.height,
              opacity: fadeOutBounds,
            },
          ]}
        />
      ) : null}
      <BarCodeScanner
        onBarCodeScanned={scanning ? onScanned : undefined}
        style={styles.scanner}
      />
      <Animated.View
        style={[{ transform: [{ translateY: moveBubble }] }, styles.card]}
      >
        <Text style={styles.cardText}>
          {patientScanned ? "Scan medication" : "Scan patient"}
        </Text>
      </Animated.View>
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

      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeOutOverlay,
            backgroundColor: "green",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    zIndex: 7,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  scanner: {
    flex: 1,
    width: "100%",
    paddingTop: "0%",
    backgroundColor: "blue",
  },
  highlight: {
    position: "absolute",
    zIndex: 4,
    borderColor: "tomato",
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 99, 71, 0.25)",
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
