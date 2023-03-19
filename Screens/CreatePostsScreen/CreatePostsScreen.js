import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome, SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./CreatePost.styles";

export const CreatePostsScreen = () => {
  const [keyboardShow, setKeyboardShow] = useState(false);

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboard}>
      <ScrollView style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        <View style={{ ...styles.view, paddingBottom: keyboardShow ? 60 : 34 }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.photoBox}>
              <TouchableWithoutFeedback>
                <View style={styles.photo}>
                  <View style={styles.icon}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.editText}>Add photo</Text>
            </View>
            <TextInput style={styles.input} placeholder="Title..." onFocus={() => setKeyboardShow(true)} />
            <View>
              <View style={styles.mapPin}>
                <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
              </View>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                placeholder="Location..."
                onFocus={() => setKeyboardShow(true)}
                onBlur={() => setKeyboardShow(false)}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TouchableOpacity style={styles.button} disabled={true}>
                <Text style={styles.buttonText}>Publish</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.delete}>
                <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
