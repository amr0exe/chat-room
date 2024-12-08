import React, { useState } from 'react';
import Login from '@/components/ui/Login';
import ChatRoom from '@/components/ui/ChatRoom';

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
};

export default App;