import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./PostsScreen.styles";
import { Item } from "../../components/Item/Item";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { name, email, avatar } = useSelector((state) => state.auth.user);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const db = await collection(firestore, "posts");
    const q = query(db, orderBy("createdAt"));
    await onSnapshot(q, (data) => {
      setPosts(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    });
  };

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.photo}>
          <AntDesign name="user" size={30} color="#BDBDBD" />
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={posts}
        renderItem={({ item }) => <Item post={item} navigation={navigation} />}
        keyExtractor={() => Math.random().toString()}
      />
    </View>
  );
};
