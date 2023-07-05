import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: selectedColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <ImageBackground
      source={require("../assets/bgImage.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>ChatMe</Text>
        <View style={styles.chatcontainer}>
          <View style={styles.startchat}>
            {/* User Name Input to be used in the chat*/}
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
            <Text style={styles.bgcolortitle}>Choose Background Color:</Text>
            <View style={styles.bgcolorContainer}>
              {/* Background Color Options for the user to select */}
              <TouchableOpacity
                style={[
                  styles.bgcolor,
                  styles.bgcolor1,
                  selectedColor === "#090C08" && styles.selectedColor,
                ]}
                onPress={() => handleColorSelection("#090C08")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bgcolor,
                  styles.bgcolor2,
                  selectedColor === "#474056" && styles.selectedColor,
                ]}
                onPress={() => handleColorSelection("#474056")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bgcolor,
                  styles.bgcolor3,
                  selectedColor === "#8A95A5" && styles.selectedColor,
                ]}
                onPress={() => handleColorSelection("#8A95A5")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bgcolor,
                  styles.bgcolor4,
                  selectedColor === "#B9C6AE" && styles.selectedColor,
                ]}
                onPress={() => handleColorSelection("#B9C6AE")}
              ></TouchableOpacity>
            </View>

            {/* Start Chatting Button */}
            <TouchableOpacity
              style={[styles.button, { height: 50 }]}
              onPress={signInUser}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  chatcontainer: {
    width: "88%",
    height: 300,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  startchat: {
    width: "88%",
  },
  bgcolortitle: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#757083",
    opacity: 1,
    textAlign: "left",
    marginTop: 10,
  },
  bgcolorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  bgcolor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  bgcolor1: {
    backgroundColor: "#090C08",
  },
  bgcolor2: {
    backgroundColor: "#474056",
  },
  bgcolor3: {
    backgroundColor: "#8A95A5",
  },
  bgcolor4: {
    backgroundColor: "#B9C6AE",
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#757083",
  },
  button: {
    backgroundColor: "#757083",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Start;
