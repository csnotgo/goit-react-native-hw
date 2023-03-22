import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./PostsScreen.styles";
import { Item } from "../../components/Item/Item";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.photo}></View>
        <View style={styles.infoBox}>
          <Text style={styles.name}>User User</Text>
          <Text style={styles.email}>user@mail.com</Text>
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
