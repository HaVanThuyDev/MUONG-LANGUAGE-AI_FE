import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/components/LoginScreen.js';
import ChatScreen from './src/components/ChatScreen.js';
import FolkLoader from './src/components/FolkLoader.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoadingFolk, setIsLoadingFolk] = useState(false);

  const handleStartLogin = (user) => {
    setUsername(user);
    setIsLoadingFolk(true);
  };

  const handleFolkLoaderFinish = () => {
    setIsLoadingFolk(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setIsLoadingFolk(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <ChatScreen username={username} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleStartLogin} />
      )}

      {isLoadingFolk && (
        <FolkLoader onFinished={handleFolkLoaderFinish} duration={2200} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
