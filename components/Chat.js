import { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, userID } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    const messageList = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          const createdAt = doc.data().createdAt.toDate(); // Convert Timestamp to Date
          newMessages.push({ id: doc.id, ...doc.data(), createdAt });
        });
        setMessages(newMessages);
      }
    );

    // Clean up code
    return () => {
      if (messageList) messageList();
    };
  }, []);

  return (
    <View style={styles.container} backgroundColor={color}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
