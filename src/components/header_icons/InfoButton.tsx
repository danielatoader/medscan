import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface InfoButtonProps {
  onPress: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = (props) => {
  return (
    <View style={styles.icon}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="help-circle" color="tomato" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoButton;
