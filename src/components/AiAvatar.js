import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AiAvatar = memo(({ size = 32, style }) => {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }, style]}>
      <Image
        source={require('../../assets/logo_muong.png')}
        style={{ width: size, height: size, borderRadius: size / 2, resizeMode: 'cover' }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});

export default AiAvatar;
