/* app/index.tsx */
import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  StatusBar, 
  Animated 
} from 'react-native';
import { useRouter } from "expo-router"; 

const { width } = Dimensions.get('window');

const SLIDE_DATA = [
  { id: '1', title: 'Your Ultimate\nTravel Partner.', subTitle: 'Duri pata na chale. Travel anywhere\nwith comfort and ease.' },
  { id: '2', title: 'Track Your\nJourney.', subTitle: 'Real-time updates to keep you\ninformed at every step.' },
  { id: '3', title: 'Ready to\nExplore?', subTitle: 'Join Hello 11 and start your\nadventure today.' },
];

const Start = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter(); 
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current; 
  const fadeAnim = useRef(new Animated.Value(1)).current;  

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false,
      listener: (event: any) => {
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (currentIndex !== activeIndex) {
          setActiveIndex(currentIndex);
        }
      }
    }
  );

  const handleNext = () => {
    if (activeIndex < SLIDE_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        router.push("/screens/LoginScreen"); 
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.yellowBackground}>
        <SafeAreaView style={styles.safeArea}>
          <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
             <View style={styles.logoWrapper}>
              <Image 
                //ya logo ka liya hai
                source={require('../assets/images/imgss.jpeg')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          <Animated.View style={[
            styles.bottomSheet, 
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
          ]}>
            <Animated.FlatList
              ref={flatListRef}
              data={SLIDE_DATA}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.textSlide}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subTitle}>{item.subTitle}</Text>
                </View>
              )}
            />

            <View style={styles.footer}>
              <View style={styles.paginationContainer}>
                {SLIDE_DATA.map((_, index) => (
                  <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {activeIndex === SLIDE_DATA.length - 1 ? "Get started" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFD700' },
  yellowBackground: { flex: 1 },
  safeArea: { flex: 1 },
  imageContainer: { flex: 1.4, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: '#FFF',
    borderRadius: (width * 0.6) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: { width: '101%', height: '101%' },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 35,
  },
  textSlide: { width: width, paddingHorizontal: 40, alignItems: 'center' },
  title: { fontSize: 30, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginBottom: 12 },
  subTitle: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24 },
  footer: { paddingHorizontal: 40, paddingBottom: 40, alignItems: 'center' },
  paginationContainer: { flexDirection: 'row', marginBottom: 25 },
  dot: { height: 8, width: 8, borderRadius: 4, backgroundColor: '#E2E8F0', marginHorizontal: 5 },
  activeDot: { width: 24, backgroundColor: '#FFD700' },
  primaryButton: {
    backgroundColor: '#1E293B',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});

export default Start;