import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import API from "../server_communication/api";

enum ConnectionStatus {
  CONNECTED = "connected",
  NOT_CONNECTED = "not connected",
}

const NetworkStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.NOT_CONNECTED
  );

  const check = () => {
    API.checkNetwork().then(
      (s) => {
        setStatus(ConnectionStatus.CONNECTED);
      },
      (e) => {
        setStatus(ConnectionStatus.NOT_CONNECTED);
      }
    );
  };

  useEffect(() => {
    const loop = window.setInterval(check, 4000);

    return () => window.clearInterval(loop);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.ball,
          {
            backgroundColor:
              status === ConnectionStatus.CONNECTED ? "#34ff4a" : "red",
          },
        ]}
      />
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: "relative",
    height: 8,
    width: 8,
    borderRadius: 50,
    marginRight: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    marginBottom: 1,
  },
});

export default NetworkStatus;
