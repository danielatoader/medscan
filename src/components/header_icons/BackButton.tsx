import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  return (
    <View style={styles.icon}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="arrow-back-circle-outline" color="tomato" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginLeft: -3,
    backgroundColor: "white",
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
