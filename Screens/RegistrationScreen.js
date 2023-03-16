import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./RegistrationScreen.styles";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState({
    Login: false,
    Email: false,
    Password: false,
  });

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
        <ImageBackground style={styles.image} source={require("../assets/img/photo.BG.png")}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-85}>
            <View style={{ ...styles.view, paddingBottom: keyboardShow ? 0 : 80 }}>
              <View style={styles.photoBox}>
                <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto}>
                  <Image source={require("../assets/img/add.png")} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Registration</Text>

              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: onFocus.Login ? "#FFFFFF" : "#F6F6F6",
                  borderColor: onFocus.Login ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Login"
                value={login}
                onChangeText={(value) => setLogin(value)}
                onFocus={() => onInputFocus("Login")}
                onBlur={() => onInputBlur("Login")}
              ></TextInput>
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
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.buttonText, color: "#1B4371" }}>Already have an account? Sign in</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
