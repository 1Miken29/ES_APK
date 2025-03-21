import { Link } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInC1() {
  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center">
          <Image source={require("../../assets/images/Logo.png")} />
          <Text className="pl-3 font-outfit-semibold text-5xl leading-tight">
            EventSpace
          </Text>
        </View>
        <Text className="font-outfit text-xl my-10">Crea tu usuario</Text>
        <TextInput
          className="h-14 w-full border border-[#C4C4C4] rounded-xl p-3 font-outfit text-xl"
          placeholder="Nombre(s)*"
        />
        <View className="flex flex-row my-2">
          <TextInput
            className="h-14 w-full border border-[#C4C4C4] rounded-xl p-3 flex-1 font-outfit text-xl"
            placeholder="Apellido Paterno*"
          />
          <TextInput
            className="h-14 w-full border border-[#C4C4C4] rounded-xl p-3 flex-1 font-outfit text-xl"
            placeholder="Apellido Materno*"
          />
        </View>
        <TextInput
          className="h-14 w-full border border-[#C4C4C4] rounded-xl p-3 font-outfit text-xl"
          placeholder="Fecha de Nacimiento (DD/MM/AAAA)*"
        />
        <TouchableOpacity className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4">
          <Link
            href="/Cliente/registerC2"
            className="text-2xl font-outfit-medium text-center text-white"
          >
            Siguiente
          </Link>
        </TouchableOpacity>
        <Text className="font-outfit-medium text-xl">
            ¿Ya tienes cuenta?{" "}
            <Link href="/Cliente/sign-inC1" className="font-outfit-bold">
                Inicia Sesion
            </Link>
        </Text>
      </View>
    </View>
  );
}
