// Initialize Firebase and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
