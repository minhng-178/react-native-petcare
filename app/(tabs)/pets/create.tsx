import { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
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

import Sizes from "@/constants/Sizes";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";
import Button from "@/components/ui/Button";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

import Loader from "@/components/Loader";
import { formatDate } from "@/utils/dateFormat";
import { usePetType } from "@/providers/PetTypeProvider";
import { getPetBreedsWithType } from "@/apis/petBreed";
import { createUserPets, getPet, updateUserPets } from "@/apis/pet";

const AddPetScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const [petTypeId, setPetTypeId] = useState<string | null>(null);
  const [image, setImage] = useState({});
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [form, setForm] = useState({
    pet_name: "",
    pet_dob: new Date(),
    weight: "",
    height: "",
    image: "",
    pet_breed_id: "",
  });

  const { getId } = usePetType();

  useEffect(() => {
    const fetchIdPet = async () => {
      const id = await getId();
      setPetTypeId(id);
    };
    fetchIdPet();
  }, []);

  const { data: petBreed } = useQuery({
    queryKey: ["petBreedsWType", petTypeId],
    queryFn: () => getPetBreedsWithType(petTypeId),
    enabled: !!petTypeId,
  });

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  let updatingPet = {} as any;

  if (isUpdating) {
    const { data, isLoading } = useQuery({
      queryKey: ["pet", id],
      queryFn: () => {
        if (typeof id === "string") {
          return getPet(id);
        }
      },
    });

    if (isLoading) {
      return <Loader isLoading />;
    }

    updatingPet = data ? data : {};

    useEffect(() => {
      setForm({
        ...form,
        pet_name: updatingPet.pet_name,
        pet_breed_id: updatingPet.pet_breed_id,
        pet_dob: new Date(updatingPet.pet_dob),
        weight: updatingPet.weight.toString(),
        height: updatingPet.height.toString(),
        image: updatingPet.image,
      });
      setPetTypeId(updatingPet.pet_type_id);
      setImage(updatingPet.image);
    }, [updatingPet]);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0]?.base64) {
      setImage(`data:image/jpg;base64,` + result.assets[0].base64);
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || form.pet_dob;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (currentDate >= now) {
      alert("Ngày sinh không thể ở tương lai hoặc ngày hôm nay.");
      setShow(false);
      return;
    } else {
      setShow(false);
      setForm({ ...form, pet_dob: currentDate });
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const validateInput = () => {
    if (
      !form.pet_name ||
      !form.height ||
      !form.weight ||
      !form.pet_breed_id ||
      !form.image
    ) {
      alert("Xin hãy nhập tất cả các trường");
      return false;
    } else if (parseFloat(form.height) === 0 || parseFloat(form.weight) === 0) {
      alert("Cân nặng hoặc chiều cao phải lớn hơn 0");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const resetFields = () => {
    setForm({
      pet_name: "",
      pet_dob: new Date(),
      weight: "",
      height: "",
      image: "",
      pet_breed_id: "",
    });
    setPetTypeId(null);
    setImage({});
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }
    if (petTypeId === null) {
      console.log("petTypeId is null");
      return;
    }
    setSubmiting(true);
    try {
      const pet = await createUserPets(form, petTypeId, image);
      if (pet) {
        Toast.show({ text1: "Thêm mới thú cưng thành công" });
        resetFields();
        router.push("/pets");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    if (petTypeId === null) {
      console.log("petTypeId is null");
      return;
    }
    setSubmiting(true);
    try {
      if (typeof id === "string") {
        const pet = await updateUserPets(id, form, petTypeId, image);
        if (pet) {
          Toast.show({ text1: "Chỉnh sửa thú cưng thành công" });
          resetFields();
          router.back();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen
          options={{
            title: isUpdating ? "Chỉnh sửa thú cưng" : "Thêm thú cưng",
          }}
        />

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
          keyboardType='numeric'
        />

        <TextInput
          value={form.height}
          onChangeText={(e) => setForm({ ...form, height: e })}
          placeholder='Chiều cao(đơn vị cm)'
          style={styles.input}
          keyboardType='numeric'
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
          selectedValue={form.pet_breed_id}
          onValueChange={(itemValue) =>
            setForm({ ...form, pet_breed_id: itemValue })
          }
        >
          <Picker.Item label='Xin hãy chọn giống thú cưng của bạn' value={""} />
          {petBreed?.map((breed: any) => (
            <Picker.Item
              key={breed.id}
              label={breed.breed_name}
              value={breed.id}
            />
          ))}
        </Picker>

        <Button
          disabled={submiting}
          onPress={onSubmit}
          text={submiting ? "Đang gửi..." : "Gửi"}
        />
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
