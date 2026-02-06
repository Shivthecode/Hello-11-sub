
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

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter(); 

  const handleFocus = useCallback((id: string) => setFocusedInput(id), []);
  const handleBlur = useCallback(() => setFocusedInput(null), []);

  const handleLogin = () => {
    // Basic validation
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Please enter both mobile number and password.");
      return;
    }
    
   
    router.push("/screens/HomeScreen"); 
  };

  return (
    <View style={styles.container}>
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
          <View style={styles.topCurve} />

          <View style={styles.inner}>
            <View style={styles.textContainer}>
              <Text style={styles.header}>Welcome to{"\n"}<Text style={styles.brandName}>Hello 11</Text></Text>
              <View style={styles.accentBar} />
              <Text style={styles.subtitle}>Login to continue your premium journey</Text>
            </View>

            <View style={styles.formGroup}>
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

                <View style={[styles.inputContainer, focusedInput === 'password' && styles.focusedBorder]}>
                  <TextInput
                      style={styles.input}
                      placeholder="Security Password"
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

                <TouchableOpacity 
                  style={styles.forgetPasswordContainer}
                  onPress={() => Alert.alert("Security", "Link sent.")}
                >
                  <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.buttonText}>Continue</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFF" style={{marginLeft: 6}} />
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.newUserText}>New to Hello 11? </Text>
              <TouchableOpacity 
                onPress={() => router.push("/screens/registerScreen")}
              > 
                <Text style={styles.signupText}>Create Account</Text>
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
    top: -width * 0.58, 
    alignSelf: 'center',
    width: width * 1.6,
    height: width * 1.6,
    borderRadius: width * 10,
    backgroundColor: '#FFD700', 
    zIndex: -1,
  },
  scrollContainer: { 
    flexGrow: 1,
    paddingTop: height * 0.14, 
  },
  inner: { 
    flex: 1,
    paddingHorizontal: 32, 
    paddingBottom: 40,
  },
  textContainer: { 
    marginBottom: 30, 
    alignItems: 'center',
    marginTop: 10, 
  },
  header: { fontSize: 30, fontWeight: "900", color: "#0F172A", textAlign: 'center', lineHeight: 38 },
  brandName: { color: "#1E293B" },
  accentBar: { width: 35, height: 4, backgroundColor: '#FFD700', borderRadius: 2, marginVertical: 10 },
  subtitle: { fontSize: 14, color: "#64748B", fontWeight: "500", textAlign: 'center' },
  formGroup: { marginBottom: 12 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 12,
  },
  focusedBorder: { borderColor: "#1E293B", backgroundColor: "#FFFFFF", borderWidth: 2 },
  countryCodeBox: { backgroundColor: "#FFD700", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 10 },
  countryCode: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  input: { flex: 1, fontSize: 16, color: "#0F172A", fontWeight: "600" },
  forgetPasswordContainer: { alignSelf: 'flex-end', marginBottom: 15 },
  forgetPasswordText: { color: "#F97316", fontWeight: "700", fontSize: 12 },
  button: {
    backgroundColor: "#1E293B",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  buttonText: { color: "#FFF", fontSize: 17, fontWeight: "800" },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  newUserText: { color: "#94A3B8", fontSize: 14 },
  signupText: { color: "#F97316", fontWeight: "800", fontSize: 14 },
});

export default LoginScreen;