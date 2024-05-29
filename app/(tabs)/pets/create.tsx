import { useState } from "react";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useQueries } from "@tanstack/react-query";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Button from "@/components/ui/Button";
import { getPetBreeds } from "@/apis/petBreed";
import { getPetTypes } from "@/apis/petType";
import { uploadImage } from "@/apis/upload";
import { FontAwesome } from "@expo/vector-icons";
import { formatDate } from "@/utils/dateFormat";
import Sizes from "@/constants/Sizes";

const AddPetScreen = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    pet_name: "",
    pet_dob: new Date(),
    weight: "",
    height: "",
    image: "",
    pet_breed_id: "",
    pet_type_id: "",
  });

  const results = useQueries({
    queries: [
      { queryKey: ["petTypes"], queryFn: getPetTypes },
      { queryKey: ["petBreeds"], queryFn: getPetBreeds },
    ],
  });

  const petTypesData = results[0]?.data;
  const petBreedsData = results[1]?.data;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      const imageFile = await uploadImage(file);

      // console.log(imageFile);

      // setImage(result.assets[0].uri);
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || form.pet_dob;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (currentDate > now) {
      alert("Ngày sinh không thể ở tương lai hoặc ngày hôm nay.");
      setShow(false);
    } else {
      setShow(false);
      setForm({ ...form, pet_dob: currentDate });
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onCreate = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ title: "Thêm thú cưng" }} />

        <Image
          source={{
            uri: form.image || Images.petPlaceholder,
          }}
          style={styles.image}
        />
        <Text onPress={pickImage} style={styles.textButton}>
          Chọn ảnh
        </Text>

        <TextInput
          value={form.pet_name}
          onChangeText={(e) => setForm({ ...form, pet_name: e })}
          placeholder='Tên thú cưng'
          style={styles.input}
        />

        <TextInput
          value={form.weight}
          onChangeText={(e) => setForm({ ...form, weight: e })}
          placeholder='Cân nặng(đơn vị kg)'
          style={styles.input}
        />

        <TextInput
          value={form.height}
          onChangeText={(e) => setForm({ ...form, height: e })}
          placeholder='Chiều cao(đơn vị cm)'
          style={styles.input}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: Sizes.small,
          }}
        >
          <Text onPress={showDatepicker} style={styles.textButton}>
            <FontAwesome name='calendar-plus-o' size={18} /> Chọn ngày tháng năm
            sinh
          </Text>

          <Text style={styles.label}>{formatDate(form.pet_dob)}</Text>
        </View>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={form.pet_dob}
            mode={"date"}
            display='default'
            onChange={onChange}
          />
        )}

        <Picker
          style={styles.input}
          selectedValue={form.pet_type_id}
          onValueChange={(itemValue) =>
            setForm({ ...form, pet_type_id: itemValue })
          }
        >
          {petTypesData?.map((type: any) => (
            <Picker.Item key={type.id} label={type.type_name} value={type.id} />
          ))}
        </Picker>

        <Picker
          style={styles.input}
          selectedValue={form.pet_breed_id}
          onValueChange={(itemValue) =>
            setForm({ ...form, pet_breed_id: itemValue })
          }
        >
          {petBreedsData?.map((breed: any) => (
            <Picker.Item
              key={breed.id}
              label={breed.breed_name}
              value={breed.id}
            />
          ))}
        </Picker>

        <Button onPress={onCreate} text='Thêm mới' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.light.lightWhite,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 20,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.primary,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});
