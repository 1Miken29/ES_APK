import { Link } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function registerC2() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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

  const handleEmailChange = async (email) => {
    setFormData({...formData, email});
    if (!validateEmail(email)) {
      setErrors({...errors, email: 'Correo electrónico inválido'});
    } else {
      const isDuplicate = await checkDuplicateEmail(email);
      if (isDuplicate) {
        setErrors({...errors, email: 'Este correo ya está registrado'});
      } else {
        const newErrors = {...errors};
        delete newErrors.email;
        setErrors(newErrors);
      }
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

  const handleSubmit = async () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    const isDuplicate = await checkDuplicateEmail(formData.email);
    if (isDuplicate) {
      newErrors.email = 'Este correo ya está registrado';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Proceed to next screen or submit form
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
        <View className="flex flex-row items-center">
          <Image source={require("../../assets/images/Logo.png")} />
          <Text className="pl-3 font-outfit-semibold text-5xl leading-tight">
            EventSpace
          </Text>
        </View>
        <Text className="font-outfit text-xl my-10">Datos de acceso</Text>
        
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
          onFocus={() => setShowPasswordRequirements(true)}
          onBlur={() => setShowPasswordRequirements(false)}
        />
        {showPasswordRequirements && <PasswordRequirements />}
        {errors.password && errors.password.map((error, index) => (
          <Text key={index} className="text-red-500 text-sm mb-1">{error}</Text>
        ))}

        <TouchableOpacity 
          className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4"
          onPress={handleSubmit}
        >
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
