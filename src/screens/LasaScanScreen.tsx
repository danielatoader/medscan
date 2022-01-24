import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import LasaScanTutorial from "../components/modals/LasaScanTutorial";
import React from "react";
import InfoButton from "../components/header_icons/InfoButton";
import Svg, { Path } from "react-native-svg";
import LasaDetectedModal from "../components/modals/LasaDetectedModal";
import MedicationData from "../models/MedicationData";
import ScanData from "../models/ScanData";
import API from "../server_communication/api";
import { Audio } from "expo-av";
import NetworkStatus from "../components/NetworkStatus";
import history from "../history";
import HistoryButton from "../components/header_icons/HistoryButton";

//@ts-ignore
const LasaScanScreen: React.FC = ({ navigation }) => {
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

  const requestMedData = (s: ScanData) => {
    API.checkLasa(s.data).then(
      (med) => {
        setMedData(med);
        history.unshift({
          medData: med,
          code: s.data,
          type: s.type,
          timestamp: new Date().toUTCString(),
        });
      },
      (err) => {
        setScanning(false);
        Alert.alert(
          "Error",
          "This code was not recognized",
          [
            {
              text: "Try again",
              style: "cancel",
              onPress: () => setScanning(true),
            },
          ],
          {
            cancelable: true,
            onDismiss: () => setScanning(true),
          }
        );
      }
    );
  };

  useEffect(() => {
    if (!medData) return;
    userFeedback(medData.isLasa);
    if (!tutorialVisible && medData.isLasa) {
      setLasaWarningVisible(true);
      setScanning(false);
    }
  }, [medData]);

  const userFeedback = (lasa: boolean) => {
    animateOverlay();
    if (lasa) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    playSound(lasa);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <InfoButton onPress={() => setTutorial(true)} />,
      headerRight: () => (
        <HistoryButton onPress={() => navigation.navigate("History")} />
      ),
      headerTitle: () => <NetworkStatus />,
    });
  }, [navigation]);

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

  const playSound = async (lasa: boolean) => {
    if (lasa) {
      await lasaSound.loadAsync(require("../../assets/lasa_sound.mp3"));
      await lasaSound.playAsync();
    } else {
      await okSound.loadAsync(require("../../assets/ok_sound.mp3"));
      await okSound.playAsync();
    }
  };

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
    bounds,
  }) => {
    if (scanData.bounds) return;
    setScanData({ bounds: bounds, data: data, type: type });
    requestMedData({ bounds: bounds, data: data, type: type });
    setTimeout(() => {
      setScanData({ data: data, type: type, bounds: undefined });
    }, 2000);
    animateBounds();
  };

  const fadeOutBounds = useRef(new Animated.Value(1)).current;
  const fadeOutOverlay = useRef(new Animated.Value(0.6)).current;

  const animateBounds = () => {
    fadeOutBounds.setValue(1);
    Animated.timing(fadeOutBounds, {
      toValue: 0,
      duration: 800,
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
    <>
      {lasaWarningVisible && medData ? (
        <LasaDetectedModal
          onClose={() => {
            setLasaWarningVisible(false);
            setScanning(true);
          }}
          medName={medData.medicationName}
          similarNames={medData.random_cluster_members}
          type={scanData.type}
          medCode={scanData.data}
        />
      ) : null}
      {tutorialVisible ? (
        <LasaScanTutorial onClose={() => setTutorial(false)} />
      ) : null}
      <View style={styles.container}>
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
          onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
          style={styles.scanner}
        />
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
        {medData ? (
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: fadeOutOverlay,
                backgroundColor: medData.isLasa ? "red" : "green",
              },
            ]}
          />
        ) : null}

        {medData ? (
          <View
            style={[
              styles.explanation,
              { backgroundColor: medData.isLasa ? "crimson" : "lightgreen" },
            ]}
          >
            <Text style={{ color: medData.isLasa ? "white" : "black" }}>
              Last scanned:
            </Text>
            <Text
              style={[
                styles.text,
                { color: medData.isLasa ? "white" : "black" },
              ]}
            >
              {medData.medicationName}
            </Text>
            <View style={styles.separator} />
            <Text
              style={{
                color: medData.isLasa ? "white" : "black",
                fontSize: 20,
              }}
            >
              {medData.isLasa ? "" : "NOT"} LASA
            </Text>
          </View>
        ) : null}
      </View>
    </>
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
  },
  overlay: {
    zIndex: 7,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  explanation: {
    zIndex: 10,
    position: "absolute",
    padding: 15,
    bottom: 20,
    width: "90%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "900",
  },
  highlight: {
    position: "absolute",
    zIndex: 4,
    borderColor: "tomato",
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 99, 71, 0.25)",
  },
  separator: {
    height: 10,
  },
  overlayIcon: {
    zIndex: 4,
    width: "60%",
    height: "60%",
    position: "absolute",
    alignItems: "center",
    opacity: 0.4,
  },
});

export default LasaScanScreen;
export const name = "Lasa";
