//ha home screen hai
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler, 
  ToastAndroid // Exit message dikhane ke liye
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router"; 

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const params = useLocalSearchParams();
  const displayName = params.userName || "Shiv"; 

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [activeTab, setActiveTab] = useState("Home"); 
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // --- DOUBLE BACK PRESS TO EXIT LOGIC ---
  useEffect(() => {
    let backPressCount = 0;

    const backAction = () => {
      // Agar user Home tab par nahi hai, toh pehle Home par le jayein
      if (activeTab !== "Home") {
        setActiveTab("Home");
        return true;
      }

      // Double tap logic
      if (backPressCount === 0) {
        backPressCount++;
        if (Platform.OS === 'android') {
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        }
        
        // 2 second ke andar dusra press hona chahiye
        setTimeout(() => {
          backPressCount = 0;
        }, 2000); 
        return true;
      } else {
        BackHandler.exitApp(); // App ko band karna ka liya 
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [activeTab]); 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 120, animated: true });
    }, 100);
  };

  const TabItem = ({ name, icon, label }: { name: string, icon: any, label: string }) => (
    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => setActiveTab(name)}
    >
      <Ionicons 
        name={activeTab === name ? icon : `${icon}-outline`} 
        size={24} 
        color={activeTab === name ? "#1E293B" : "#94A3B8"} 
      />
      <Text style={[styles.tabLabel, { color: activeTab === name ? "#1E293B" : "#94A3B8" }]}>
        {label}
      </Text>
      {activeTab === name && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <View style={styles.headerWrapper}>
        <View style={styles.yellowCurve} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.welcomeText}>Hello,</Text>
              <Text style={styles.userNameText}>{displayName}</Text> 
            </View>
            <TouchableOpacity style={styles.notificationCircle}>
              <Ionicons name="notifications-outline" size={24} color="#1E293B" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Where are you{"\n"}going today?</Text>
            <Text style={styles.heroSubtitle}>Book your ride with Hello11</Text>
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={[styles.searchCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <View style={styles.indicatorContainer}>
                  <View style={styles.sourceDot} /><View style={styles.verticalLine} />
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>From where</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Current Location"
                    placeholderTextColor="#94A3B8"
                    value={source}
                    onChangeText={setSource}
                    onFocus={handleFocus}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.indicatorContainer}><Ionicons name="location" size={20} color="#F97316" /></View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Where to go</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Destination"
                    placeholderTextColor="#94A3B8"
                    value={destination}
                    onChangeText={setDestination}
                    onFocus={handleFocus}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.searchButton} activeOpacity={0.8} onPress={() => Keyboard.dismiss()}>
              <Text style={styles.searchButtonText}>Search Ride</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" style={{marginLeft: 8}} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.recentSection, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>Recent Places</Text>
            <TouchableOpacity style={styles.recentItem}>
              <View style={styles.recentIconBox}><Ionicons name="time-outline" size={20} color="#64748B" /></View>
              <View>
                  <Text style={styles.recentTitle}>Lucknow Railway Station</Text>
                  <Text style={styles.recentSub}>Lucknow, Uttar Pradesh</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomTabBar}>
        <TabItem name="Home" icon="home" label="Home" />
        <TabItem name="Activity" icon="list" label="Activity" />
        <TabItem name="Booking" icon="calendar" label="Booking" /> 
        <TabItem name="Profile" icon="person" label="Profile" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  headerWrapper: {
    height: height * 0.38,
    backgroundColor: '#FFD700', // Yellow color
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40,
    zIndex: 1,
  },
  yellowCurve: {
    position: 'absolute', bottom: -width * 0.2, alignSelf: 'center',
    width: width * 1.5, height: width * 0.2, backgroundColor: '#FFFFFF',
    borderRadius: width, transform: [{ scaleX: 1.3 }], opacity: 0.1,
  },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, paddingHorizontal: 25 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  welcomeText: { fontSize: 16, color: "#1E293B", fontWeight: "500", opacity: 0.7 },
  userNameText: { fontSize: 22, color: "#1E293B", fontWeight: "900" },
  notificationCircle: { backgroundColor: '#FFF', padding: 10, borderRadius: 15, elevation: 2 },
  notificationDot: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#F97316', borderWidth: 1.5, borderColor: '#FFF' },
  heroSection: { marginTop: 30 },
  heroTitle: { fontSize: 30, fontWeight: "900", color: "#1E293B", lineHeight: 36, fontStyle: 'italic' },
  heroSubtitle: { fontSize: 15, color: "#1E293B", marginTop: 8, fontWeight: "600", opacity: 0.7 },
  
  keyboardView: { flex: 1, zIndex: 10, marginTop: -height * 0.06 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 120 },
  searchCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, elevation: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 15, borderWidth: 1, borderColor: '#F1F5F9', zIndex: 100 },
  inputGroup: { marginBottom: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  indicatorContainer: { width: 30, alignItems: 'center' },
  sourceDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3B82F6', borderWidth: 2, borderColor: '#BFDBFE' },
  verticalLine: { width: 2, height: 35, backgroundColor: '#E2E8F0', marginVertical: 4, borderStyle: 'dashed' },
  inputField: { flex: 1, marginLeft: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 8 },
  inputLabel: { fontSize: 11, color: "#94A3B8", fontWeight: "700", textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: 16, color: "#1E293B", fontWeight: "600", marginTop: 2 },
  searchButton: { backgroundColor: '#1E293B', paddingVertical: 16, borderRadius: 18, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  searchButtonText: { color: '#FFF', fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },
  
  recentSection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B", marginBottom: 15 },
  recentItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 15, borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  recentIconBox: { backgroundColor: '#FFF', padding: 8, borderRadius: 12, marginRight: 15 },
  recentTitle: { fontSize: 15, color: "#1E293B", fontWeight: "700" },
  recentSub: { fontSize: 12, color: "#94A3B8", fontWeight: "500", marginTop: 2 },

  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: Platform.OS === 'ios' ? 90 : 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    elevation: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: width / 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E293B',
    marginTop: 4,
  }
});

export default HomeScreen;