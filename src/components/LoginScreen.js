import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, Image, SafeAreaView } from 'react-native';
import styles from './LoginScreen.styles';

const LogoComponent = ({ width = 80, height = 80, style }) => (
  <Image
    source={require('../../assets/logo_muong.png')}
    style={[{ width, height, resizeMode: 'contain' }, style]}
  />
);

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      onLogin(username);
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.loginContent}>
        <LogoComponent style={styles.loginLogo} />
        <Text style={styles.loginTitle}>AI Language Muong</Text>
        <Text style={styles.loginSubtitle}>Đăng nhập để bắt đầu trò chuyện</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nhập tên đăng nhập"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;