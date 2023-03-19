import React, { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import posts from "../../posts.json";
import { styles } from "./Comments.styles";

export const CommentsScreen = ({ _, route }) => {
  const [keyboardShow, setKeyboardShow] = useState(false);

  const id = route.params.id;
  const post = posts.find((post) => post.id === id);

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboard}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ ...styles.view, paddingBottom: keyboardShow ? 100 : 16 }}>
          <View style={styles.imgBox}>
            <Image style={styles.photo} source={{ uri: post.url }}></Image>
          </View>
          <View>
            <TextInput
              placeholder="Comment..."
              style={styles.input}
              onFocus={() => setKeyboardShow(true)}
              onBlur={() => setKeyboardShow(false)}
            />
            <TouchableOpacity style={styles.button}>
              <Ionicons name="arrow-up-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

{
  /* <FlatList
  style={styles.chat}
  data={post.comments}
  renderItem={({ text }) => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 28, height: 28, borderRadius: 50, backgroundColor: "gray" }}></View>
      <View style={{ backgroundColor: "gray" }}>
        <Text>{text}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.id}
></FlatList>; */
}
