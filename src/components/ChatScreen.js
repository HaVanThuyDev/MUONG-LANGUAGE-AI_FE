import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import styles from './ChatScreen.styles.js';
import {
  PlusIcon,
  SearchIcon,
  FolderIcon,
  BookIcon,
  SparklesIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  MenuIcon,
  TrashIcon,
  CloseIcon,
} from './Icons.js';
import { chatWithMuongAI } from '../service/chatService.js';
import { analyzeMuongImage } from '../service/imageAnalysisService.js';

const STORAGE_KEY = 'muong_chat_claude_v3';
const DEFAULT_REGION = 'TIẾNG MƯỜNG';

const TOPIC_OPTIONS = [
  'Ngôn ngữ thường ngày',
  'Đời sống văn hóa',
  'Phong tục tập quán',
];

const ChatScreen = ({ username = 'Người dùng', onLogout }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Search state in sidebar
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Topic selector
  const [selectedTopic, setSelectedTopic] = useState('Ngôn ngữ thường ngày');
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  // Sessions and Active Chat state
  const [sessions, setSessions] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved sessions', e);
      }
    }
    return [
      {
        id: 'session-1',
        title: 'Đoạn chat mới',
        createdAt: Date.now(),
        messages: [],
      },
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState('session-1');

  // Input states
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollRef = useRef(null);

  // Sync sessions to localStorage on web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {
        console.warn('Failed to save sessions', e);
      }
    }
  }, [sessions]);

  // Current session's messages
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const messages = currentSession?.messages || [];

  // Update current session messages
  const updateCurrentSessionMessages = useCallback((updater) => {
    setSessions((prevSessions) => {
      return prevSessions.map((s) => {
        if (s.id === activeSessionId) {
          const newMessages = typeof updater === 'function' ? updater(s.messages) : updater;
          let newTitle = s.title;
          if (s.title === 'Đoạn chat mới' && newMessages.length > 0) {
            const firstUserMsg = newMessages.find((m) => m.role === 'user');
            if (firstUserMsg) {
              newTitle = (firstUserMsg.text || 'Hình ảnh').slice(0, 24);
            }
          }
          return {
            ...s,
            title: newTitle,
            messages: newMessages,
            updatedAt: Date.now(),
          };
        }
        return s;
      });
    });
  }, [activeSessionId]);

  // Create new session
  const handleNewChat = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      title: 'Đoạn chat mới',
      createdAt: Date.now(),
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setText('');
    setSelectedImage(null);
    if (!isDesktop) closeSidebar();
  };

  // Delete session
  const handleDeleteSession = (sessionId, e) => {
    e?.stopPropagation?.();
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      if (filtered.length === 0) {
        const fresh = {
          id: `session-${Date.now()}`,
          title: 'Đoạn chat mới',
          createdAt: Date.now(),
          messages: [],
        };
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Image Picking
  const handlePickImage = async () => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          setSelectedImage({
            uri: url,
            name: file.name,
            type: file.type,
          });
        }
      };
      input.click();
    } else {
      try {
        const ImagePicker = require('expo-image-picker');
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 0.8,
        });
        if (!result.canceled && result.assets?.[0]) {
          const asset = result.assets[0];
          setSelectedImage({
            uri: asset.uri,
            name: asset.fileName || 'image.jpg',
          });
        }
      } catch (error) {
        Alert.alert('Thông báo', 'Không thể mở thư viện ảnh.');
      }
    }
  };

  // Send Chat
  const sendChat = async () => {
    const queryText = text.trim();
    if ((!queryText && !selectedImage) || loading) return;

    setTopicDropdownOpen(false);

    const userMsg = {
      role: 'user',
      text: queryText,
      image: selectedImage ? { ...selectedImage } : null,
      mode: 'chat',
      topic: selectedTopic,
    };

    const currentImage = selectedImage;

    setText('');
    setSelectedImage(null);
    updateCurrentSessionMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let aiText = '';

      if (currentImage) {
        aiText = await analyzeMuongImage({
          imageUri: currentImage.uri,
          imageName: currentImage.name,
          prompt: queryText,
        });

        if (queryText) {
          try {
            const apiResult = await chatWithMuongAI({
              user_id: 1,
              text: `[Chủ đề: ${selectedTopic}] ${queryText}`,
              region_hint: DEFAULT_REGION,
            });
            if (apiResult?.data?.reply) {
              aiText += '\n\n' + apiResult.data.reply;
            }
          } catch (e) {
            // Keep local analysis
          }
        }
      } else {
        const apiResult = await chatWithMuongAI({
          user_id: 1,
          text: queryText,
          region_hint: DEFAULT_REGION,
        });

        aiText = apiResult?.data?.reply || 'Chưa có câu trả lời.';
      }

      updateCurrentSessionMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: aiText,
        },
      ]);
    } catch (err) {
      updateCurrentSessionMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Chưa có câu trả lời.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard Enter handler
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      if (Platform.OS === 'web') {
        e.preventDefault?.();
      }
      sendChat();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBF9" />

      {/* MOBILE / TABLET SMOOTH BACKDROP */}
      {!isDesktop && (
        <View
          style={[
            styles.sidebarBackdrop,
            {
              opacity: sidebarOpen ? 1 : 0,
              pointerEvents: sidebarOpen ? 'auto' : 'none',
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            activeOpacity={1}
            onPress={closeSidebar}
          />
        </View>
      )}

      {/* SILKY SMOOTH SIDEBAR DRAWER */}
      <View
        style={[
          styles.sidebar,
          isDesktop
            ? (!sidebarOpen && styles.sidebarClosedDesktop)
            : [
                styles.sidebarOverlay,
                {
                  width: Math.min(270, width * 0.82),
                  transform: [{ translateX: sidebarOpen ? 0 : -320 }],
                  pointerEvents: sidebarOpen ? 'auto' : 'none',
                },
              ],
        ]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.sidebarHeader}>
            {/* Top row with Menu Toggle / Close button so clicking ☰ again closes it seamlessly */}
            <View style={styles.sidebarTopRow}>
              <TouchableOpacity
                style={styles.sidebarCloseBtn}
                onPress={closeSidebar}
                activeOpacity={0.7}
                title="Đóng menu"
              >
                <MenuIcon size={17} color="#57534E" />
              </TouchableOpacity>
              <Text style={styles.sidebarBrandTitle}>AI Ngôn ngữ Mường</Text>
            </View>

            {/* "+ Tạo mới" Claude Button */}
            <TouchableOpacity
              style={styles.newChatClaudeBtn}
              onPress={handleNewChat}
              activeOpacity={0.7}
            >
              <PlusIcon size={16} color="#2E2C29" />
              <Text style={styles.newChatClaudeText}>Tạo mới</Text>
            </TouchableOpacity>

              {/* Sidebar Menu Navigation */}
              <View style={styles.sidebarMenuList}>
                {isSearching ? (
                  <View style={styles.searchBarWrap}>
                    <SearchIcon size={14} color="#78756E" />
                    <TextInput
                      style={styles.searchInput}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Tìm kiếm..."
                      placeholderTextColor="#A8A29E"
                      autoFocus
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setIsSearching(false);
                        setSearchQuery('');
                      }}
                      style={{ padding: 2 }}
                      activeOpacity={0.7}
                    >
                      <CloseIcon size={13} color="#78716C" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.sidebarMenuItem}
                    onPress={() => setIsSearching(true)}
                    activeOpacity={0.7}
                  >
                    <SearchIcon size={16} color="#57534E" />
                    <Text style={styles.sidebarMenuText}>Tìm kiếm</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
                  <FolderIcon size={16} color="#57534E" />
                  <Text style={styles.sidebarMenuText}>Dự án</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
                  <BookIcon size={16} color="#57534E" />
                  <Text style={styles.sidebarMenuText}>Từ điển Mường</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
                  <SparklesIcon size={16} color="#57534E" />
                  <Text style={styles.sidebarMenuText}>Đặc sắc văn hóa</Text>
                </TouchableOpacity>
              </View>

              {/* Section Header */}
              <View style={styles.historySectionHeader}>
                <Text style={styles.historySectionTitle}>Đoạn chat và tác vụ</Text>
                <ChevronDownIcon size={12} color="#78756E" />
              </View>
            </View>

            {/* History List */}
            <ScrollView style={styles.historySection}>
              {sessions
                .filter(
                  (item) =>
                    !searchQuery.trim() ||
                    item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
                )
                .map((item) => {
                  const isActive = item.id === activeSessionId;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.historyItem, isActive && styles.historyItemActive]}
                      onPress={() => {
                        setActiveSessionId(item.id);
                        if (!isDesktop) closeSidebar();
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.historyItemBullet}>○</Text>
                      <Text
                        style={[styles.historyItemText, isActive && styles.historyItemActiveText]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      {sessions.length > 1 && (
                        <TouchableOpacity
                          style={styles.deleteHistoryBtn}
                          onPress={(e) => handleDeleteSession(item.id, e)}
                        >
                          <TrashIcon size={13} color="#A8A29E" />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>

            {/* Sidebar Footer: Profile */}
            <View style={styles.sidebarFooter}>
              <View style={styles.userProfileRow}>
                <View style={styles.userProfileLeft}>
                  <View style={styles.userAvatarCircle}>
                    <Text style={styles.userAvatarText}>
                      {username ? username.charAt(0).toLowerCase() : 'x'}
                    </Text>
                  </View>
                  <View style={styles.userProfileNameWrap}>
                    <Text style={styles.userName} numberOfLines={1}>{username}</Text>
                    <Text style={styles.userTier}>• Tiếng Mường</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={onLogout}
                  activeOpacity={0.7}
                >
                  <Text style={styles.logoutText}>Thoát</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

      {/* MAIN CHAT AREA */}
      <View style={styles.mainContainer}>
        {/* TOP BAR */}
        <SafeAreaView style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <TouchableOpacity
              style={styles.menuToggleBtn}
              onPress={toggleSidebar}
              activeOpacity={0.7}
              title={sidebarOpen ? 'Thu gọn menu' : 'Mở menu'}
            >
              <MenuIcon size={17} color="#57534E" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>AI Ngôn ngữ Mường</Text>
          </View>
        </SafeAreaView>

        {/* CHAT MESSAGES SCROLL */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            style={styles.chatScrollView}
            contentContainerStyle={styles.chatContentContainer}
            ref={scrollRef}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps="handled"
          >
            {/* WELCOME SCREEN (CLAUDE EXACT STYLE) */}
            {messages.length === 0 && (
              <View style={[styles.welcomeWrap, isMobile && styles.welcomeWrapMobile]}>
                <Image
                  source={require('../../assets/logo_muong.png')}
                  style={[styles.welcomeLogo, isMobile && { width: 42, height: 42, borderRadius: 21 }]}
                />
                <Text style={[styles.welcomeTitle, isMobile && { fontSize: 19 }]}>AI Ngôn ngữ Mường</Text>
                <Text style={[styles.welcomeDesc, isMobile && { fontSize: 13, maxWidth: 320 }]}>
                  Tra cứu từ vựng và giải đáp văn hóa dân tộc Mường
                </Text>
              </View>
            )}

            {/* MESSAGES */}
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <View
                  key={index}
                  style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAi]}
                >
                  {!isUser && (
                    <Image
                      source={require('../../assets/logo_muong.png')}
                      style={styles.aiAvatar}
                    />
                  )}

                  <View style={isUser ? [styles.bubbleUser, isMobile && styles.bubbleUserMobile] : styles.bubbleAi}>
                    {msg.image?.uri && (
                      <Image
                        source={{ uri: msg.image.uri }}
                        style={[styles.bubbleImage, isMobile && { width: Math.min(220, width * 0.7), height: 140 }]}
                        resizeMode="cover"
                      />
                    )}

                    {!!msg.text && (
                      <Text style={isUser ? styles.bubbleTextUser : styles.bubbleText}>
                        {msg.text}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}

            {/* THINKING STATE */}
            {loading && (
              <View style={styles.messageRow}>
                <Image
                  source={require('../../assets/logo_muong.png')}
                  style={styles.aiAvatar}
                />
                <View style={styles.thinkingRow}>
                  <Text style={styles.thinkingText}>Tới một chút hảy.....</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* ======================================================== */}
          {/* CLAUDE CHAT INPUT CARD (FULL RESPONSIVE) */}
          {/* ======================================================== */}
          <View style={styles.inputOuterContainer}>
            <View style={styles.inputCardContainer}>
              {/* IMAGE PREVIEW IF ATTACHED */}
              {selectedImage && (
                <View style={styles.imagePreviewPill}>
                  <Text style={styles.imagePreviewText} numberOfLines={1}>
                    {selectedImage.name || 'Ảnh đính kèm'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSelectedImage(null)}
                    activeOpacity={0.7}
                  >
                    <CloseIcon size={12} color="#78716C" />
                  </TouchableOpacity>
                </View>
              )}

              {/* CARD CONTAINER */}
              <View style={styles.claudeCard}>
                {/* Textarea */}
                <TextInput
                  style={[
                    styles.textInput,
                    Platform.OS === 'web' && {
                      outlineStyle: 'none',
                      outlineWidth: 0,
                    },
                  ]}
                  value={text}
                  onChangeText={setText}
                  placeholder="Hôm nay tôi có thể giúp gì cho bạn?"
                  placeholderTextColor="#A8A29E"
                  multiline
                  onKeyPress={handleKeyPress}
                  onSubmitEditing={sendChat}
                  blurOnSubmit={false}
                />

                {/* Bottom Controls Bar (Responsive & Balanced) */}
                <View style={styles.cardBottomBar}>
                  {/* Left: [+] [Đoạn chat] */}
                  <View style={styles.cardBottomLeft}>
                    {/* [+] Upload Image/File Button */}
                    <TouchableOpacity
                      style={styles.plusAttachBtn}
                      onPress={handlePickImage}
                      activeOpacity={0.7}
                      title="Đính kèm ảnh hoặc tệp"
                    >
                      <PlusIcon size={15} color="#57534E" />
                    </TouchableOpacity>

                    {/* Claude Mode Badge: [Đoạn chat] */}
                    <View style={styles.chatPillBadge}>
                      <Text style={styles.chatPillText}>Đoạn chat</Text>
                    </View>
                  </View>

                  {/* Right: [Topic Selector] [Send Button] */}
                  <View style={styles.cardBottomRight}>
                    {/* Topic Selector Trigger */}
                    <TouchableOpacity
                      style={styles.topicSelectorTrigger}
                      onPress={() => setTopicDropdownOpen((prev) => !prev)}
                      activeOpacity={0.7}
                      title="Chọn chủ đề"
                      {...(Platform.OS === 'web'
                        ? {
                            onMouseEnter: () => setTopicDropdownOpen(true),
                          }
                        : {})}
                    >
                      <Text style={styles.topicSelectorText} numberOfLines={1}>
                        {selectedTopic}
                      </Text>
                      <ChevronDownIcon size={12} color="#78756E" />
                    </TouchableOpacity>

                    {/* Send Button */}
                    <TouchableOpacity
                      style={[
                        styles.claudeSendBtn,
                        ((!text.trim() && !selectedImage) || loading) && styles.claudeSendBtnDisabled,
                      ]}
                      onPress={sendChat}
                      disabled={(!text.trim() && !selectedImage) || loading}
                      activeOpacity={0.8}
                      title="Gửi tin nhắn"
                    >
                      <ArrowUpIcon size={15} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Dropdown Menu for Topic Selection */}
                {topicDropdownOpen && (
                  <View
                    style={styles.topicDropdownMenu}
                    {...(Platform.OS === 'web'
                      ? {
                          onMouseLeave: () => setTopicDropdownOpen(false),
                        }
                      : {})}
                  >
                    {TOPIC_OPTIONS.map((topic) => {
                      const isSelected = topic === selectedTopic;
                      return (
                        <TouchableOpacity
                          key={topic}
                          style={[
                            styles.topicMenuItem,
                            isSelected && styles.topicMenuItemActive,
                          ]}
                          onPress={() => {
                            setSelectedTopic(topic);
                            setTopicDropdownOpen(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.topicMenuItemText,
                              isSelected && styles.topicMenuItemTextActive,
                            ]}
                          >
                            {topic}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;
