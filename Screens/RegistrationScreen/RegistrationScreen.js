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
  Image,
} from "react-native";
import { styles } from "./RegistrationScreen.styles";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/auth/auth-operations";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import { Loader } from "../../components/Loader/Loader";

export const RegistrationScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState("");
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

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const listenShow = Keyboard.addListener("keyboardDidShow", () => setKeyboardShow(true));
    const listenHide = Keyboard.addListener("keyboardDidHide", () => setKeyboardShow(false));
    return () => {
      listenShow.remove();
      listenHide.remove();
    };
  }, []);

  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const showPassword = () => {
    setPasswordHide(!passwordHide);
  };

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  const uploadFile = async () => {
    if (!avatar) return;

    const res = await fetch(avatar);
    const file = await res.blob();
    const id = Date.now().toString();
    const photoRef = ref(storage, `usersAvatars/${id}`);
    await uploadBytes(photoRef, file);
    const fileURL = await getDownloadURL(photoRef);
    return fileURL;
  };

  const onSubmit = async () => {
    try {
      showKeyboard();
      const photoURL = await uploadFile();
      dispatch(authRegister({ email, password, login, photoURL }));

      setLogin("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
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
          {isLoading && <Loader />}
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-85}>
            <View style={{ ...styles.view, paddingBottom: keyboardShow ? 0 : 80 }}>
              <View style={styles.photoBox}>
                <AntDesign name="user" size={50} color="#BDBDBD" />
                {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
                {!avatar ? (
                  <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto} onPress={addAvatar}>
                    <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto} onPress={() => setAvatar("")}>
                    <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
                  </TouchableOpacity>
                )}
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

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ ...styles.buttonText, color: "#1B4371" }}>Already have an account? Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
