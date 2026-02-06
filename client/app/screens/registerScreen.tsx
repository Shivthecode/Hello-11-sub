import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Input from "../../components/Input";
import Button from "../../components/Button";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    if (!name || phoneNumber.length < 10 || password.length < 6) {
      Alert.alert("Attention", "Please fill all fields correctly.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    Alert.alert("Success", `Welcome ${name}! Account created successfully!`);

    router.push({
      pathname: "/screens/HomeScreen",
      params: { userName: name }
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow pt-[16vh]"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Yellow Design Section */}
          <View className="absolute -top-[105%] self-center w-[180%] aspect-square rounded-[120%] bg-[#FFD700] -z-10" />

          <View className="flex-1 px-8 pb-10">
            <View className="mb-5 items-center relative">
              <TouchableOpacity onPress={() => router.back()} className="absolute left-[-15px] -top-16 p-2.5 z-10">
                <Ionicons name="arrow-back" size={24} color="#1E293B" />
              </TouchableOpacity>

              <View className="h-[120px] justify-center items-center w-full">
                <Text className="text-[28px] font-black text-slate-900 text-center leading-8">
                  Create{"\n"}<Text className="text-slate-800">New Account</Text>
                </Text>
                <View className="w-9 h-1 bg-slate-800 rounded-full mt-2" />
              </View>

              <Text className="text-sm text-slate-500 font-semibold text-center mt-2 mb-10">Join Hello 11 for a premium experience</Text>
            </View>

            <View className="mb-3">
              {/* Full Name Input */}
              <Input
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                isFocused={focusedInput === 'name'}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                icon={<Ionicons name="person-outline" size={20} color="#94A3B8" />}
              />

              {/* Mobile Number Input */}
              <Input
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
                isFocused={focusedInput === 'phone'}
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
                icon={
                  <View className="bg-[#FFD700] px-2.5 py-1.5 rounded-lg">
                    <Text className="text-sm font-extrabold text-slate-800">+91</Text>
                  </View>
                }
              />

              {/* Password Input */}
              <Input
                placeholder="Create Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                isFocused={focusedInput === 'password'}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                icon={<Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />}
                rightIcon={
                  <Ionicons
                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={focusedInput === 'password' ? "#1E293B" : "#94A3B8"}
                  />
                }
                onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />

              {/* Confirm Password Input */}
              <Input
                placeholder="Confirm Password"
                secureTextEntry={!isPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isFocused={focusedInput === 'confirm'}
                onFocus={() => setFocusedInput('confirm')}
                onBlur={() => setFocusedInput(null)}
                icon={<Ionicons name="shield-checkmark-outline" size={20} color="#94A3B8" />}
              />
            </View>

            <Button title="Sign Up" onPress={handleRegister} />

            <View className="flex-row justify-center mt-6">
              <Text className="text-slate-400 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/screens/LoginScreen")}>
                <Text className="text-orange-500 font-extrabold text-sm">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
