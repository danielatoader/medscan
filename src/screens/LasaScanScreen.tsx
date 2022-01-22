import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import LasaScanTutorial from "../components/modals/LasaScanTutorial";
import React from "react";
import LasaInfoIcon from "../components/header_icons/LasaInfoButton";
import Svg, { Path } from "react-native-svg";
import LasaDetectedModal from "../components/modals/LasaDetectedModal";
import LasaScanHistoryIcon from "../components/header_icons/LasaScanHistoryIcon";
import MedicationData from "../models/MedicationData";
import ScanData from "../models/ScanData";
import API from "../server_communication/api";
import { Audio } from "expo-av";

//@ts-ignore
const LasaScanScreen: React.FC = ({ navigation }) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanData, setScanData] = useState<ScanData>({
    data: "",
    type: "",
    bounds: undefined,
  });
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [lasaWarningVisible, setLasaWarningVisible] = useState(false);
  const okSound = new Audio.Sound();
  const lasaSound = new Audio.Sound();

  const medData = useMemo<MedicationData | undefined>(() => {
    if (!scanData.bounds) return undefined;
    else {
      API.getMedication(scanData.data).then(
        (med) => {
          handleMedData(med);
          return med;
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
          return undefined;
        }
      );
    }
  }, [scanData]);

  const handleMedData = (medData: MedicationData) => {
    userFeedback(medData.lasa);
    if (!tutorialVisible && medData.lasa) {
      setLasaWarningVisible(true);
      setScanning(false);
    }
  };

  const userFeedback = (lasa: boolean) => {
    if (lasa) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      okSound.playAsync();
    }
    playSound(lasa);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <LasaInfoIcon onPress={() => setTutorial(true)} />,
      headerRight: () => (
        <LasaScanHistoryIcon onPress={() => navigation.navigate("History")} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      Promise.all([
        BarCodeScanner.requestPermissionsAsync(),
        Audio.requestPermissionsAsync(),
      ]).catch(() => console.log("Oop"));
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
    if (scanData.data === data) return;
    setTimeout(() => {
      setScanData({ data: "", type: "", bounds: undefined });
    }, 1000);
    setScanData({ bounds: bounds, data: data, type: type });
    animateBounds();
    animateOverlay();
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
          medName={medData.name}
          similarNames={["blabo", "obanouch", "nadida", "brequel", "davidd"]}
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
                backgroundColor: medData.lasa ? "red" : "green",
              },
            ]}
          />
        ) : null}
        {medData ? (
          <View
            style={[
              styles.explanation,
              { backgroundColor: medData.lasa ? "crimson" : "lightgreen" },
            ]}
          >
            <Text>Last scanned:</Text>
            <Text style={styles.text}>{medData.name}</Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 20 }}>
              {medData.lasa ? "" : "NOT"} LASA
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
