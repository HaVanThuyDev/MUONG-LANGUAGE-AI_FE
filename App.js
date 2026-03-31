import React, { useState } from 'react';
import LoginScreen from './src/components/LoginScreen.js';
import ChatScreen from './src/components/ChatScreen.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return isLoggedIn
    ? <ChatScreen username={username} onLogout={handleLogout} />
    : <LoginScreen onLogin={handleLogin} />;
}