import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { styles } from "./Item.styles";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";

export const Item = ({ post, navigation }) => {
  const [total, setTotal] = useState(0);

  const { id, fileUrl, avatar, title, coordinates, location } = post;

  useEffect(() => {
    const colRef = collection(firestore, "posts");
    const postRef = doc(colRef, id);
    const commentsRef = collection(postRef, "comments");
    onSnapshot(commentsRef, (data) => setTotal(data.docs.length));
  }, []);

  if (post) {
    return (
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <Image style={styles.photo} source={{ uri: fileUrl }}></Image>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments", { postId: id, url: fileUrl, avatar: avatar })}
            style={styles.infoBox}
          >
            <FontAwesome name="comment" size={24} color={!total ? "#BDBDBD" : "#FF6C00"} />
            <Text style={styles.text}>{total}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { coords: coordinates })}
            style={{ ...styles.infoBox, marginLeft: "auto" }}
          >
            <Feather name="map-pin" size={18} color="#BDBDBD" />
            <Text style={styles.location}>{location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
