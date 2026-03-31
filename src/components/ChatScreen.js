import React, { useState, useRef, useEffect, memo } from 'react';
import {
  Text, View, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Image, SafeAreaView,
  KeyboardAvoidingView, Platform, Animated
} from 'react-native';
import styles from './ChatScreen.styles.js';
import { chatWithMuongAI } from '../service/chatService.js';

// Delay tối thiểu để animation kịp hiện (ms)
const MIN_LOADING_MS = 1200;

const LogoComponent = ({ width = 40, height = 40, style }) => (
  <Image
    source={require('../../assets/logo_muong.png')}
    style={[{ width, height, resizeMode: 'contain' }, style]}
  />
);

const BouncingDot = memo(({ delay }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: -8, duration: 300, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0,  duration: 300, useNativeDriver: true }),
        Animated.delay(450),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[styles.typingDot, { transform: [{ translateY: anim }] }]}
    />
  );
});

const TypingIndicator = memo(() => (
  <View style={[styles.msgRow, styles.msgRowAi]}>
    <LogoComponent width={28} height={28} style={styles.avatarImg} />
    <View style={styles.typingWrap}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 4, gap: 5 }}>
        <BouncingDot delay={0} />
        <BouncingDot delay={150} />
        <BouncingDot delay={300} />
      </View>
    </View>
  </View>
));

const ChatScreen = ({ username, onLogout }) => {
  const [text, setText] = useState('');
  const [region, setRegion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const regions = ['', 'TIẾNG MƯỜNG'];
  const regionLabels = {
    '': 'Không chọn',
    'TIẾNG MƯỜNG': 'Tiếng Mường',
  };

  const sendChat = async () => {
    if (!text.trim() || loading) return;

    const trimmedText = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: trimmedText }]);
    setText('');
    setLoading(true);

    // Chạy song song: gọi API + đếm thời gian tối thiểu
    const [data] = await Promise.all([
      chatWithMuongAI({
        user_id: 1,
        text: trimmedText,
        region_hint: region || null,
      }).catch(e => ({ error: e.message })),
      new Promise(resolve => setTimeout(resolve, MIN_LOADING_MS)), // delay tối thiểu
    ]);

    setLoading(false);

    if (data?.error) {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: `Lỗi kết nối server: ${data.error}`, terms: [] },
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: data?.data?.reply || 'Không có phản hồi.',
          terms: data?.data?.matched_terms || [],
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />

      <SafeAreaView style={styles.safeTop}>
        <View style={styles.header}>
          <LogoComponent width={36} height={36} />
          <View style={styles.headerInfo}>
            <Text style={styles.brand}>AI Language Muong</Text>
            <Text style={styles.brandSub}>Xin chào, {username}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.regionRow}>
          {regions.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.regionBtn, region === r && styles.regionBtnActive]}
              onPress={() => setRegion(r)}
            >
              <Text style={[styles.regionText, region === r && styles.regionTextActive]}>
                {regionLabels[r]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 && (
            <Text style={styles.empty}>
              {'Hãy đặt câu hỏi về\nTiếng Mường hoặc Phương ngữ Việt'}
            </Text>
          )}

          {messages.map((msg, i) => (
            <View
              key={i}
              style={[styles.msgRow, msg.role === 'user' ? styles.msgRowUser : styles.msgRowAi]}
            >
              {msg.role === 'ai' && (
                <LogoComponent width={28} height={28} style={styles.avatarImg} />
              )}
              <View style={[styles.bubble, msg.role === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                <Text style={[styles.msgText, msg.role === 'user' && styles.msgTextUser]}>
                  {msg.text}
                </Text>
                {msg.terms?.map((t, j) => (
                  <View key={j} style={styles.tag}>
                    <Text style={styles.tagText}>{t.local_term} = {t.standard_vi}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {loading && <TypingIndicator />}
        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Nhắn tin..."
              placeholderTextColor="#9CA3AF"
              multiline
              returnKeyType="send"
              onSubmitEditing={sendChat}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={sendChat}
            disabled={!text.trim() || loading}
            activeOpacity={0.8}
          >
            <Text style={styles.sendText}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;