import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import styles from './LoginScreen.styles';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('Người dùng');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.loginCard}>
        <Image
          source={require('../../assets/logo_muong.png')}
          style={styles.logo}
        />

        <Text style={styles.loginTitle}>AI Ngôn ngữ Mường</Text>
        <Text style={styles.loginSubtitle}>
          Hệ thống tra cứu và giải đáp ngôn ngữ, văn hóa Mường
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput
            style={[
              styles.input,
              Platform.OS === 'web' && { outlineStyle: 'none' },
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder="Nhập tên đăng nhập"
            placeholderTextColor="#94A3B8"
            onSubmitEditing={handleLogin}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[
              styles.input,
              Platform.OS === 'web' && { outlineStyle: 'none' },
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            onSubmitEditing={handleLogin}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
