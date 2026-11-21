import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import styles from './LoginScreen.styles';
import { GoogleIcon } from './Icons';

const LoginScreen = ({ onLogin }) => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('account'); // 'account' | 'phone'

  // Form states
  const [username, setUsername] = useState('Người dùng xứ Mường');
  const [phoneNumber, setPhoneNumber] = useState('0987654321');
  const [password, setPassword] = useState('123456');

  // Register form states
  const [regFullName, setRegFullName] = useState('');
  const [regPhoneOrEmail, setRegPhoneOrEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Smooth sliding indicator animation (0 = Login, 1 = Register)
  const tabAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const contentSlideAnim = useRef(new Animated.Value(0)).current;

  const handleSwitchTab = (newTab) => {
    if (newTab === tab) return;

    const toVal = newTab === 'register' ? 1 : 0;
    const slideDirection = newTab === 'register' ? 20 : -20;

    // Slide the tab indicator
    Animated.timing(tabAnim, {
      toValue: toVal,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // needed for width/left interpolation
    }).start();

    // Slide & fade the form content
    contentSlideAnim.setValue(slideDirection);
    contentFadeAnim.setValue(0);

    setTab(newTab);

    Animated.parallel([
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLoginSubmit = () => {
    if (loginMethod === 'phone') {
      const phone = phoneNumber.trim() || '0987654321';
      onLogin(`User ${phone.slice(-4)}`);
    } else {
      const user = username.trim() || 'Người dùng';
      onLogin(user);
    }
  };

  const handleRegisterSubmit = () => {
    const name = regFullName.trim() || regPhoneOrEmail.trim() || 'Thành viên mới';
    onLogin(name);
  };

  const handleGoogleLogin = () => {
    onLogin('Google User');
  };

  // Interpolate pill position
  const pillLeft = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['1%', '49.5%'],
  });

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBF9" />

      <View style={styles.loginCard}>
        {/* Logo and Greeting */}
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/logo_muong.png')}
            style={styles.logo}
          />
          <Text style={styles.loginTitle}>AI Ngôn ngữ Mường</Text>
          <Text style={styles.loginSubtitle}>
            Tra cứu từ vựng và giải đáp văn hóa dân tộc Mường
          </Text>
        </View>

        {/* Tab switch with SMOOTH SLIDING PILL */}
        <View style={styles.authTabsWrap}>
          {/* Animated sliding background pill */}
          <Animated.View style={[styles.slidingPill, { left: pillLeft }]} />

          <TouchableOpacity
            style={styles.authTabBtn}
            onPress={() => handleSwitchTab('login')}
            activeOpacity={0.8}
          >
            <Text style={[styles.authTabText, tab === 'login' && styles.authTabTextActive]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.authTabBtn}
            onPress={() => handleSwitchTab('register')}
            activeOpacity={0.8}
          >
            <Text style={[styles.authTabText, tab === 'register' && styles.authTabTextActive]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Container with animated slide & fade transition */}
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: contentFadeAnim,
              transform: [{ translateX: contentSlideAnim }],
            },
          ]}
        >
          {tab === 'login' ? (
            /* TAB ĐĂNG NHẬP */
            <View>
              {/* Method Toggle: Tài khoản / Số điện thoại */}
              <View style={styles.methodToggleRow}>
                <TouchableOpacity
                  onPress={() => setLoginMethod('account')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.methodToggleText,
                      loginMethod === 'account' && styles.methodToggleTextActive,
                    ]}
                  >
                    Tên đăng nhập
                  </Text>
                </TouchableOpacity>

                <Text style={{ color: '#D6D3CD' }}>|</Text>

                <TouchableOpacity
                  onPress={() => setLoginMethod('phone')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.methodToggleText,
                      loginMethod === 'phone' && styles.methodToggleTextActive,
                    ]}
                  >
                    Số điện thoại
                  </Text>
                </TouchableOpacity>
              </View>

              {loginMethod === 'phone' ? (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Số điện thoại</Text>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Nhập số điện thoại (vd: 0987...)"
                    placeholderTextColor="#A8A29E"
                    keyboardType="phone-pad"
                    onSubmitEditing={handleLoginSubmit}
                  />
                </View>
              ) : (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Tên đăng nhập</Text>
                  <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Nhập tên đăng nhập"
                    placeholderTextColor="#A8A29E"
                    onSubmitEditing={handleLoginSubmit}
                  />
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#A8A29E"
                  secureTextEntry
                  onSubmitEditing={handleLoginSubmit}
                />
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleLoginSubmit}
                activeOpacity={0.85}
              >
                <Text style={styles.submitBtnText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* TAB ĐĂNG KÝ */
            <View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Họ và tên / Danh xưng</Text>
                <TextInput
                  style={styles.input}
                  value={regFullName}
                  onChangeText={setRegFullName}
                  placeholder="Nhập họ và tên của bạn"
                  placeholderTextColor="#A8A29E"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Số điện thoại hoặc Email</Text>
                <TextInput
                  style={styles.input}
                  value={regPhoneOrEmail}
                  onChangeText={setRegPhoneOrEmail}
                  placeholder="Nhập SĐT hoặc Email"
                  placeholderTextColor="#A8A29E"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput
                  style={styles.input}
                  value={regPassword}
                  onChangeText={setRegPassword}
                  placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
                  placeholderTextColor="#A8A29E"
                  secureTextEntry
                  onSubmitEditing={handleRegisterSubmit}
                />
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleRegisterSubmit}
                activeOpacity={0.85}
              >
                <Text style={styles.submitBtnText}>Đăng ký tài khoản</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
            activeOpacity={0.85}
          >
            <GoogleIcon size={18} />
            <Text style={styles.googleBtnText}>
              {tab === 'login' ? 'Tiếp tục với Google' : 'Đăng ký bằng Google'}
            </Text>
          </TouchableOpacity>

          {/* Guest Experience Link */}
          <TouchableOpacity
            style={styles.guestLink}
            onPress={() => onLogin('Khách trải nghiệm')}
            activeOpacity={0.7}
          >
            <Text style={styles.guestLinkText}>Trải nghiệm trực tiếp không cần mật khẩu</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
