import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface HistoryButtonProps {
  onPress: () => void;
}

const HistoryButton: React.FC<HistoryButtonProps> = (props) => {
  return (
    <View style={styles.icon}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="book" color="tomato" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    marginRight: 10,
    paddingLeft: 0.5,
    paddingTop: 2,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HistoryButton;
