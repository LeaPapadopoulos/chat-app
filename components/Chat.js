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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db }) => {
  const { name, userID } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  let messageList;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (messageList) messageList();
      messageList = null;

      messageList = onSnapshot(
        query(collection(db, "messages"), orderBy("createdAt", "desc")),
        async (documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach((doc) => {
            const createdAt = doc.data().createdAt.toDate(); // Convert Timestamp to Date
            newMessages.push({ id: doc.id, ...doc.data(), createdAt });
          });
          cacheMessages(newLists);
          setMessages(newMessages);
        }
      );
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (messageList) messageList();
    };
  }, [isConnected]);

  const cacheMessages = async (listsToCache) => {
    try {
      await AsyncStorage.setItem("messages-list", JSON.stringify(newMessages));
    } catch (error) {
      console.log(error.message);
    }
  };

  let unsubShoppinglists;

  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubShoppinglists) unsubShoppinglists();
      unsubShoppinglists = null;

      const q = query(
        collection(db, "shoppinglists"),
        where("uid", "==", userID)
      );
      unsubShoppinglists = onSnapshot(q, (documentsSnapshot) => {
        let newLists = [];
        documentsSnapshot.forEach((doc) => {
          newLists.push({ id: doc.id, ...doc.data() });
        });
        cacheShoppingLists(newLists);
        setLists(newLists);
      });
    } else loadCachedLists();

    // Clean up code
    return () => {
      if (unsubShoppinglists) unsubShoppinglists();
    };
  }, [isConnected]);

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
