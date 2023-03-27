import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { firestore, storage } from "../../firebase/config";
import {
  Image,
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [camera, setCamera] = useState(null);

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { id, name } = useSelector((state) => state.auth.user);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    const { coords } = await Location.getCurrentPositionAsync();
    setCoordinates((prevState) => {
      return { ...prevState, latitude: coords.latitude, longitude: coords.longitude };
    });
  };

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  const publishPost = () => {
    uploadPost();
    navigation.navigate("Posts");
    setPhoto("");
    setTitle("");
    setLocation("");
  };

  const deletePost = () => {
    setPhoto("");
    setTitle("");
    setLocation("");
  };

  const uploadFile = async () => {
    const res = await fetch(photo);
    const file = await res.blob();
    const id = Date.now().toString();
    const photoRef = ref(storage, `postImages/${id}`);
    await uploadBytes(photoRef, file);
    const fileURL = await getDownloadURL(photoRef);
    return fileURL;
  };

  const uploadPost = async () => {
    const fileUrl = await uploadFile();
    const db = await collection(firestore, "posts");
    addDoc(db, { fileUrl, title, location, coordinates, userId: id, name });
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboard}>
      <ScrollView style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        <View style={{ ...styles.view, paddingBottom: keyboardShow ? 60 : 34 }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.photoBox}>
              {photo && <Image source={{ uri: photo }} style={styles.photo}></Image>}
              <Camera style={styles.camera} ref={setCamera} onCameraReady={() => true}>
                <TouchableOpacity onPress={takePhoto} disabled={photo ? true : false}>
                  <View style={styles.icon}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </View>
                </TouchableOpacity>
              </Camera>
            </View>
            <Text style={styles.editText}>Add photo</Text>

            <TextInput
              style={{
                ...styles.input,
                fontWeight: title ? "500" : "400",
                fontFamily: title ? "Roboto-Medium" : "Roboto-Regular",
              }}
              placeholder="Title..."
              value={title}
              onFocus={() => setKeyboardShow(true)}
              onBlur={() => setKeyboardShow(false)}
              onChangeText={setTitle}
            />

            <View>
              <View style={styles.mapPin}>
                <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
              </View>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                placeholder="Location..."
                value={location}
                onFocus={() => setKeyboardShow(true)}
                onBlur={() => setKeyboardShow(false)}
                onChangeText={setLocation}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: photo ? "#FF6C00" : "#F6F6F6" }}
                onPress={publishPost}
              >
                <Text style={{ ...styles.buttonText, color: photo ? "#FFFFFF" : "#BDBDBD" }}>Publish</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.delete} onPress={deletePost}>
                <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
