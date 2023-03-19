import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const ButtonBack = ({ children }) => {
  const navigation = useNavigation();
  return <TouchableOpacity onPress={() => navigation.goBack()}>{children}</TouchableOpacity>;
};
