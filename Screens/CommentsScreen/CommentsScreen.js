import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./CommentsScreen.styles";
import { addDoc, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { Comment } from "../../components/Comment/Comment";

export const CommentsScreen = ({ route }) => {
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const { id, avatar } = useSelector((state) => state.auth.user);
  const { postId, url } = route.params;

  useEffect(() => {
    getAllComments();
  }, []);

  const showKeyboard = () => {
    setKeyboardShow(false);
    Keyboard.dismiss();
  };

  const addComment = async () => {
    const db = await collection(firestore, "posts");
    const item = await doc(db, postId);
    const comments = await collection(item, "comments");
    addDoc(comments, { comment, createdAt: Date.now(), userId: id, avatar });
    setComment("");
  };

  const getAllComments = async () => {
    const db = await collection(firestore, "posts");
    const item = await doc(db, postId);
    const comments = await collection(item, "comments");
    const q = query(comments, orderBy("createdAt"));
    await onSnapshot(q, (data) => {
      setCommentsList(data.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboard}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ ...styles.view, paddingBottom: keyboardShow ? 100 : 16 }}>
          <View style={styles.imgBox}>
            <Image style={styles.photo} source={{ uri: url }}></Image>
          </View>

          <SafeAreaView style={styles.chat}>
            {commentsList.length === 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.noComments}>There is no comments yet</Text>
                <MaterialCommunityIcons name="emoticon-sad-outline" size={30} color="#BDBDBD" />
              </View>
            ) : (
              <FlatList
                data={commentsList}
                renderItem={({ item }) => <Comment item={item} />}
                keyExtractor={() => Math.random().toString()}
              ></FlatList>
            )}
          </SafeAreaView>

          <View>
            <TextInput
              placeholder="Comment..."
              value={comment}
              style={styles.input}
              onChangeText={(val) => setComment(val)}
              onFocus={() => setKeyboardShow(true)}
              onBlur={() => setKeyboardShow(false)}
            />
            <TouchableOpacity style={styles.button} onPress={addComment} disabled={comment ? false : true}>
              <Ionicons name="arrow-up-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
