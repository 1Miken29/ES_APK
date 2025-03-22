import { Link, router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function registerP2() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasMinLength = password.length >= 8;

    const newErrors = [];
    if (!hasUpperCase) newErrors.push('Debe contener al menos una mayúscula');
    if (!hasLowerCase) newErrors.push('Debe contener al menos una minúscula');
    if (!hasSpecialChar) newErrors.push('Debe contener al menos un carácter especial (#,$,%,&,@)');
    if (!hasMinLength) newErrors.push('Debe contener al menos 8 caracteres');

    return newErrors;
  };

  const checkDuplicateEmail = async (email) => {
    // Aquí deberías implementar la lógica para verificar el email en tu backend
    // Por ahora retornamos false como ejemplo
    return false;
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    } else if (await checkDuplicateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico ya registrado';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un carácter especial (#,$,%,&,@) y un número (0-9)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/exito");
    }
  };

  const PasswordRequirements = () => (
    <View className="w-full border-2 p-4 mb-4">
      <Text className="font-outfit-medium mb-2">Tu contraseña debe contener:</Text>
      <View className="pl-4">
        <Text className="font-outfit text-sm mb-1">• Al menos 8 caracteres de largo</Text>
        <Text className="font-outfit text-sm mb-1">• Letras minúsculas (a-z)</Text>
        <Text className="font-outfit text-sm mb-1">• Letras mayúsculas (A-Z)</Text>
        <Text className="font-outfit text-sm">• Al menos un carácter especial (#,$,%,&,@)</Text>
        <Text className="font-outfit text-sm">• Números (0-9)</Text>
      </View>
    </View>
  );

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center w-80">
          <Image source={require("../../assets/images/Logo.png")}/>
          <Text className="pl-3 font-outfit-semibold text-2xl leading-tight">
            EventSpace | {" "}
          </Text>
          <Text className="font-outfit text-2xl">Propietarios</Text>
        </View>
        <Text className="font-outfit text-xl my-10">Crea tu usuario</Text>
        <TextInput
          className={`h-14 w-full border ${errors.email ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2`}
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
        {errors.email && <Text className="text-red-500 text-sm">{errors.email}</Text>}
        <TextInput
          className={`h-14 w-full border ${errors.password ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl`}
          placeholder="Contraseña*"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
          onFocus={() => setShowPasswordRequirements(true)}
          onBlur={() => setShowPasswordRequirements(false)}
        />
        {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}
        {showPasswordRequirements && <PasswordRequirements />}
        <TouchableOpacity className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4" onPress={handleSubmit}>
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Registrarse
          </Text>
        </TouchableOpacity>
        <Text className="font-outfit-medium text-xl">
            ¿Ya tienes cuenta?{" "}
            <Link href="/" className="font-outfit-bold">
                Inicia Sesion
            </Link>
        </Text>
      </View>
    </View>
  );
}
