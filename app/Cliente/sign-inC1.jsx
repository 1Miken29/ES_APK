import { Link, router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function SignInC1() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasMinLength = password.length >= 8;

    

  const handleEmailChange = (email) => {
    setFormData({...formData, email});
    if (email.length === 0) {
      setErrors({...errors, email: 'El correo es requerido'});
    } else if (!validateEmail(email)) {
      setErrors({...errors, email: 'Formato de correo inválido'});
    } else {
      const newErrors = {...errors};
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePasswordChange = (password) => {
    setFormData({...formData, password});
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrors({...errors, password: passwordErrors});
    } else {
      const newErrors = {...errors};
      delete newErrors.password;
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }

    if (!formData.password) {
      newErrors.password = ['La contraseña es requerida'];
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors;
      }
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica de inicio de sesión
      router.push("/Cliente/home");
    }
  };

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center">
          <Image source={require("../../assets/images/Logo.png")} />
          <Text className="pl-3 font-outfit-semibold text-5xl leading-tight">
            EventSpace
          </Text>
        </View>
        <Text className="font-outfit text-xl my-10">Iniciar Sesión</Text>
        
        <TextInput
          className={`h-14 w-full border ${errors.email ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2`}
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>}

        <TextInput
          className={`h-14 w-full border ${errors.password ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2`}
          placeholder="Contraseña*"
          value={formData.password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {errors.password && errors.password.map((error, index) => (
          <Text key={index} className="text-red-500 text-sm mb-1">{error}</Text>
        ))}

        <TouchableOpacity 
          className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4"
          onPress={handleSubmit}
        >
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        
        <Text className="font-outfit-medium text-xl">
          ¿No tienes cuenta?{" "}
          <Link href="/Cliente/registerC1" className="font-outfit-bold">
            Regístrate
          </Link>
        </Text>
      </View>
    </View>
  );
}
}
