import { Modal, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LasaScanTutorialProps {
  onClose: () => void;
}

const LasaScanTutorial: React.FC<LasaScanTutorialProps> = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={props.onClose}
    >
      <SafeAreaView style={styles.modal}>
        <View style={{alignItems: "center"}}>
          <Text style={{fontSize: 30}}>
            <Text style={styles.boldTomato}>Scan </Text>
            <Text>your medication and we'll tell you if it's a </Text>
            <Text style={styles.boldTomato}>LASA.</Text>
          </Text>
					<Image style={styles.image} source={require("../../../assets/code_scanning.gif")}></Image>
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
		color: "tomato"
	},
	image: {
		width: 200,
		height: 200
	}
});

export default LasaScanTutorial;
