import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PetTypeData = {
  id: string | null;
  setId: (id: string | null) => void;
  getId: () => Promise<string | null>;
};

const PetTypeContext = createContext<PetTypeData>({
  id: null,
  setId: () => {},
  getId: async () => null,
});

export const PetTypeProvider = ({ children }: PropsWithChildren) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdPet = async () => {
      const id = await AsyncStorage.getItem("idPet");

      setId(id);
    };

    fetchIdPet();
  }, []);

  const getId = async () => {
    const id = await AsyncStorage.getItem("idPet");

    return id;
  };

  return (
    <PetTypeContext.Provider value={{ id, setId, getId }}>
      {children}
    </PetTypeContext.Provider>
  );
};

export const usePetType = () => useContext(PetTypeContext);
