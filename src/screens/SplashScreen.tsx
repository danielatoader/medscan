import React from "react";
import LottieView from "lottie-react-native";
import { Text, StyleSheet, View, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SplashProps {
  navigation: any;
}

interface SplashState {
  progress: Animated.Value;
}

class SplashScreen extends React.Component<SplashProps, SplashState> {
  constructor(props: SplashProps) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1700,
        easing: Easing.bounce,
        useNativeDriver: false, // needed for loop callback to work (bug on react native's side)
      }),
      { iterations: 3 }
    ).start(({ finished }) => {
      this.props.navigation.navigate("TabNavigator");
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.animation}>
        <LottieView
          source={require("../animations/splash.json")}
          progress={this.state.progress}
        />
        <Text style={styles.titleText}>LASA Detection</Text>
        <Text style={styles.versionText}>version: 1.0.1</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  animation: { flex: 1, margin: 25, marginTop: 30, position: "relative" },
  titleText: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    width: "100%",
    color: "tomato",
    fontFamily: "Optima-Bold",
    position: "absolute",
    top: 120,
  },
  versionText: {
    fontWeight: "300",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
    color: "tomato",
    fontFamily: "Optima",
    position: "absolute",
    bottom: 80,
  },
});

export default SplashScreen;
