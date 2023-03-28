import Toast from "react-native-toast-message";

export const showToast = (type, text1) => {
  Toast.show({
    type: type,
    text1: text1,
    autoHide: true,
    visibilityTime: 2000,
  });
};
