import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LasaDetectedModalProps {
  medName: string;
  medCode: string;
  type: string;
  similarNames: string[];
  onClose: () => void;
}

const LasaDetectedModal: React.FC<LasaDetectedModalProps> = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={props.onClose}
    >
      <SafeAreaView style={styles.modal}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginBottom: 25 }}>
            p. code: {props.medCode} ({props.type})
          </Text>
          <Text style={{ fontSize: 25 }}>
            <Text style={styles.boldWhite}>{props.medName} </Text>
            <Text>has been labeled </Text>
            <Text style={styles.boldWhite}>LASA </Text>
            <Text>by our AI{"\n\n"}</Text>

            <Text style={styles.boldWhite}>{props.medName} </Text>
            <Text>could potentially be mistaken with: </Text>
            <Text style={{ color: "gold" }}>
              {props.similarNames.slice(0, 4).join(", ")}, ...{"\n\n"}
            </Text>

            <Text style={styles.actionText}>Take actions accordingly</Text>
          </Text>
          <Image
            style={styles.image}
            source={require("../../../assets/lasa_human.gif")}
            height={185}
          ></Image>
        </View>
        <TouchableOpacity onPress={props.onClose} style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Continue</Text>
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
    backgroundColor: "#f36b6bff",
    borderRadius: 15,
    padding: 30,
    paddingBottom: 90,
    paddingTop: 15,
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
  scanButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  actionText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  scanButtonText: {
    fontWeight: "500",
    fontSize: 20,
    color: "#f36b6bff",
  },
  boldWhite: {
    fontWeight: "bold",
    color: "white",
  },
  image: {
    marginTop: 15,
    width: 200,
    height: 200,
  },
});

export default LasaDetectedModal;
