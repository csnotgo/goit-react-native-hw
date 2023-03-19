import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../RegistrationScreen/RegistrationScreen.styles";

export const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState({
    Email: false,
    Password: false,
  });

  useEffect(() => {
    const listenShow = Keyboard.addListener("keyboardDidShow", () => setKeyboardShow(true));
    const listenHide = Keyboard.addListener("keyboardDidHide", () => setKeyboardShow(false));
    return () => {
      listenShow.remove();
      listenHide.remove();
    };
  }, []);

  const showPassword = () => {
    setPasswordHide(!passwordHide);
  };

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    const form = {
      login,
      email,
      password,
    };
    showKeyboard();
    console.log(form);
    setLogin("");
    setEmail("");
    setPassword("");
    navigation.navigate("Home", { screen: "Posts" });
  };

  const onInputFocus = (textInput) => {
    setKeyboardShow(true);
    setOnFocus({
      [textInput]: true,
    });
  };
  const onInputBlur = (textInput) => {
    setOnFocus({
      [textInput]: false,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboard}>
      <View>
        <ImageBackground style={styles.image} source={require("../../assets/img/photo.BG.png")}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-85}>
            <View style={{ ...styles.view, paddingBottom: keyboardShow ? 0 : 144, paddingTop: 32 }}>
              <Text style={styles.title}>Login</Text>

              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: onFocus.Email ? "#FFFFFF" : "#F6F6F6",
                  borderColor: onFocus.Email ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)}
                onFocus={() => onInputFocus("Email")}
                onBlur={() => onInputBlur("Email")}
              ></TextInput>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: onFocus.Password ? "#FFFFFF" : "#F6F6F6",
                    borderColor: onFocus.Password ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={passwordHide}
                  onChangeText={(value) => setPassword(value)}
                  onFocus={() => onInputFocus("Password")}
                  onBlur={() => onInputBlur("Password")}
                ></TextInput>
                <TouchableOpacity onPress={showPassword} style={styles.showPass} activeOpacity={0.8}>
                  <Text style={{ color: "#1B4371", fontSize: 16 }}>{passwordHide ? "Show" : "Hide"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonBox}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onSubmit}>
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                  <Text style={{ ...styles.buttonText, color: "#1B4371" }}>You haven't account? Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
