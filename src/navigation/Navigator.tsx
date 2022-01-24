import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LasaScanScreen, { name as lasaName } from "../screens/LasaScanScreen";
import PatientMedScreen, {
  name as patientMedName,
} from "../screens/PatientMedScreen";
import Icon from "@expo/vector-icons/Ionicons";
import SplashScreen from "../screens/SplashScreen";
import HistoryScreen from "../screens/HistoryScreen";

interface NavigatorProps {}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {
  switch (routeName) {
    case lasaName:
      return "scan";
    case patientMedName:
      return "body";
    default:
      return "help";
  }
};

const Navigator: React.FC<NavigatorProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: "fade_from_bottom" }}
          name="TabNavigator"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerShown: true,
            headerTitle: "Scan history",
            headerTintColor: "tomato",
          }}
          name="History"
          component={HistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon name={getIconName(route.name)} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerTitle: "",
      })}
    >
      <Tab.Screen
        options={{
          headerTransparent: true,
          unmountOnBlur: true,
        }}
        name={lasaName}
        component={LasaScanScreen}
      />
      <Tab.Screen
        options={{ headerTransparent: true, unmountOnBlur: true }}
        name={patientMedName}
        component={PatientMedScreen}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
