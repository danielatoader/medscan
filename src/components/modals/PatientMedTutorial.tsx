import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PatientMedTutorialProps {
  onClose: () => void;
}

const PatientMedTutorial: React.FC<PatientMedTutorialProps> = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={props.onClose}
    >
      <SafeAreaView style={styles.modal}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>
            <Text style={styles.boldTomato}>Scan </Text>
            <Text>a patient</Text>
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Scan patient</Text>
          </View>

          <View style={{ height: 4 }} />

					<View style={{backgroundColor: "black", height: 2, width: 300}} />

          <View style={{ height: 10 }} />

          <Text style={{ fontSize: 30 }}>
            <Text style={styles.boldTomato}>Scan </Text>
            <Text>medication</Text>
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Scan medication</Text>
          </View>

					<View style={{ height: 4 }} />

					<View style={{backgroundColor: "black", height: 2, width: 300}} />

					<View style={{ height: 10 }} />

					<Text style={{ fontSize: 30, textAlign: "center" }}>
						<Text style={{color: "green", fontWeight: "bold"}}>match{"\n"}</Text>
						<Text style={{color: "crimson", fontWeight: "bold"}}>no match</Text>
          </Text>

          <Image
            style={styles.image}
            source={require("../../../assets/patient_med.gif")}
          ></Image>


        </View>
        <TouchableOpacity onPress={props.onClose} style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Start scanning</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 10,
    height: "auto",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    paddingBottom: 90,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
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
  scanButton: {
    width: "100%",
    backgroundColor: "tomato",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  scanButtonText: {
    fontWeight: "500",
    fontSize: 20,
    color: "white",
  },
  boldTomato: {
    fontWeight: "bold",
    color: "tomato",
  },
  image: {
    width: 250,
    height: 250
  },
});

export default PatientMedTutorial;
