import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./Comment.styles";
import { AntDesign } from "@expo/vector-icons";

export const Comment = ({ item }) => {
  const { id } = useSelector((state) => state.auth.user);

  const user = item.userId === id;
  return (
    <View style={{ flex: 1, alignItems: user ? "flex-end" : "flex-start" }}>
      <View style={{ marginBottom: 24, flexDirection: user ? "row-reverse" : "row" }}>
        <View style={{ ...styles.photo, marginLeft: user ? 16 : 0, marginRight: user ? 0 : 16 }}>
          <AntDesign name="user" size={14} color="#BDBDBD" />
          {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
        </View>
        <View
          style={{
            ...styles.commentView,
            borderTopRightRadius: user ? 0 : 6,
            borderTopLeftRadius: user ? 6 : 0,
          }}
        >
          <Text>{item.comment}</Text>
          <View style={{ ...styles.dateBox, justifyContent: user ? "flex-end" : "flex-start" }}>
            <Text style={styles.date}>
              {new Date(item.createdAt).toUTCString().slice(5, 17)} |{" "}
              {new Date(item.createdAt).toLocaleTimeString().slice(0, 5)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
