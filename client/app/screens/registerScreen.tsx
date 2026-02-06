
import React, { useState, useCallback } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router"; 
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const handleFocus = useCallback((id: string) => setFocusedInput(id), []);
  const handleBlur = useCallback(() => setFocusedInput(null), []);

  const handleRegister = () => {
    // 1. Validation Logic
    if (!name || phoneNumber.length < 10 || password.length < 6) {
      Alert.alert("Attention", "Please fill all fields correctly.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // 2. Success Logic: Alert dikhayenge aur phir Home Screen par bhejenge
    Alert.alert("Success", `Welcome ${name}! Account created successfully!`);
    
    // 3. Navigation with Params: Folder structure ke hisaab se path aur parameter pass kar rahe hain
    router.push({
      pathname: "/screens/HomeScreen", 
      params: { userName: name }       
    });
  };

  return (
    <View style={styles.container}>
      {}
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Yellow Design Section */}
          <View style={styles.topCurve} />

          <View style={styles.inner}>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#1E293B" />
              </TouchableOpacity>

              <View style={styles.headerBox}>
                 <Text style={styles.header}>Create{"\n"}<Text style={styles.brandName}>New Account</Text></Text>
                 <View style={styles.accentBar} />
              </View>

              <Text style={styles.subtitle}>Join Hello 11 for a premium experience</Text>
            </View>

            <View style={styles.formGroup}>
                {/* Full Name Input */}
                <View style={[styles.inputContainer, focusedInput === 'name' && styles.focusedBorder]}>
                  <Ionicons name="person-outline" size={20} color="#94A3B8" style={styles.icon} />
                  <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor="#94A3B8"
                      value={name}
                      onChangeText={setName}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                  />
                </View>

                {/* Mobile Number Input */}
                <View style={[styles.inputContainer, focusedInput === 'phone' && styles.focusedBorder]}>
                  <View style={styles.countryCodeBox}>
                      <Text style={styles.countryCode}>+91</Text>
                  </View>
                  <TextInput
                      style={styles.input}
                      placeholder="Mobile Number"
                      placeholderTextColor="#94A3B8"
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      maxLength={10}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                  />
                </View>

                {/* Password Input */}
                <View style={[styles.inputContainer, focusedInput === 'password' && styles.focusedBorder]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.icon} />
                  <TextInput
                      style={styles.input}
                      placeholder="Create Password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!isPasswordVisible}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => handleFocus('password')}
                      onBlur={handleBlur}
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Ionicons 
                      name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={focusedInput === 'password' ? "#1E293B" : "#94A3B8"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={[styles.inputContainer, focusedInput === 'confirm' && styles.focusedBorder]}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#94A3B8" style={styles.icon} />
                  <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!isPasswordVisible}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => handleFocus('confirm')}
                      onBlur={handleBlur}
                  />
                </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.85}>
              <Text style={styles.buttonText}>Sign Up</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFF" style={{marginLeft: 6}} />
            </TouchableOpacity>

            {/* Link back to Login */}
            <View style={styles.signupContainer}>
              <Text style={styles.newUserText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/screens/LoginScreen")}> 
                <Text style={styles.signupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topCurve: {
    position: 'absolute',
    top: -width * 0.9, 
    alignSelf: 'center',
    width: width * 1.8,
    height: width * 1.7,
    borderRadius: width * 1.2,
    backgroundColor: '#FFD700',
    zIndex: -1,
  },
  scrollContainer: { flexGrow: 1, paddingTop: height * 0.09 },
  inner: { flex: 1, paddingHorizontal: 32, paddingBottom: 40 },
  backButton: { position: 'absolute', left: -15, top: -31, padding: 10, zIndex: 10 },
  textContainer: { marginBottom: 20, alignItems: 'center' },
  headerBox: { height: 120, justifyContent: 'center', alignItems: 'center', width: '100%' },
  header: { fontSize: 28, fontWeight: "900", color: "#0F172A", textAlign: 'center', lineHeight: 34 },
  brandName: { color: "#1E293B" },
  accentBar: { width: 35, height: 4, backgroundColor: '#1E293B', borderRadius: 2, marginTop: 8 },
  subtitle: { fontSize: 14, color: "#64748B", fontWeight: "600", textAlign: 'center', marginTop: 10, marginBottom: 41 },
  formGroup: { marginBottom: 12 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderColor: "#F1F5F9", borderRadius: 18, backgroundColor: "#F8FAFC", paddingHorizontal: 16, height: 58, marginBottom: 12 },
  icon: { marginRight: 10 },
  focusedBorder: { borderColor: "#1E293B", backgroundColor: "#FFFFFF", borderWidth: 2 },
  countryCodeBox: { backgroundColor: "#FFD700", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 10 },
  countryCode: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  input: { flex: 1, fontSize: 15, color: "#0F172A", fontWeight: "600" },
  button: { backgroundColor: "#1E293B", paddingVertical: 16, borderRadius: 20, alignItems: "center", justifyContent: "center", flexDirection: 'row' },
  buttonText: { color: "#FFF", fontSize: 17, fontWeight: "800" },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  newUserText: { color: "#94A3B8", fontSize: 14 },
  signupText: { color: "#F97316", fontWeight: "800", fontSize: 14 },
});

export default RegisterScreen;