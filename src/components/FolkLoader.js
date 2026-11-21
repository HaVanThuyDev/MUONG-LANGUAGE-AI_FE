import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing } from 'react-native';

const FolkLoader = ({ onFinished, duration = 1400 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Continuous smooth spinner rotation
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();

    // Finish timer
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        rotateLoop.stop();
        onFinished?.();
      });
    }, duration);

    return () => {
      rotateLoop.stop();
      clearTimeout(timer);
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.centerBox}>
        {/* Logo with rotating circular spinner ring around it */}
        <View style={styles.logoWrapper}>
          <Animated.View
            style={[
              styles.spinnerRing,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
          <Image
            source={require('../../assets/logo_muong.png')}
            style={styles.logo}
          />
        </View>

        {/* User requested: CHỈ HIỂN THỊ CHỮ "Loading....." */}
        <Text style={styles.loadingText}>Loading.....</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  spinnerRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#F59E0B',
    borderRightColor: '#D97706',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  loadingText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
});

export default FolkLoader;
