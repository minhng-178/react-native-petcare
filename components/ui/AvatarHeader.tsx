import { Image, Pressable } from "react-native";

const AvatarHeader = () => {
  return (
    <Pressable onPress={() => {}}>
      <Image
        source={{
          uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
        }}
        style={{ width: 30, aspectRatio: 1, borderRadius: 40, marginLeft: 10 }}
      />
    </Pressable>
  );
};

export default AvatarHeader;
