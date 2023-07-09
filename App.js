import { useEffect } from "react";
import { Alert } from "react-native";

// import netinfo for Detecting a Network Connection
import { useNetInfo } from "@react-native-community/netinfo";

// import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Initialize Firebase and Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
  getStorage,
} from "firebase/firestore";

const App = () => {
  // define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDchaPzF-tgENZ6faXUGL1JceM9DWBHRbg",
    authDomain: "lea-chat-app.firebaseapp.com",
    projectId: "lea-chat-app",
    storageBucket: "lea-chat-app.appspot.com",
    messagingSenderId: "937448197819",
    appId: "1:937448197819:web:f13f5f174a2a7f3d67a39e",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
