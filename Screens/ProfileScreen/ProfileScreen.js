import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../../redux/auth/auth-operations";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ProfileScreen.styles";
import { Item } from "../../components/Item/Item";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { name, id, avatar } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const db = await collection(firestore, "posts");
    const q = query(db, where("userId", "==", id));

    await onSnapshot(q, (data) => {
      setPosts(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    });
  };

  return (
    <ImageBackground style={styles.image} source={require("../../assets/img/photo.BG.png")}>
      <View style={styles.view}>
        <View style={styles.photoBox}>
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
          <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto} disabled={true}>
            {!avatar ? (
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            ) : (
              <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => dispatch(authLogout())} style={styles.logout}>
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <FlatList
          style={{ paddingHorizontal: 16, marginTop: 32 }}
          data={posts}
          renderItem={({ item }) => <Item post={item} navigation={navigation} />}
          keyExtractor={() => Math.random().toString()}
        />
      </View>
    </ImageBackground>
  );
};
