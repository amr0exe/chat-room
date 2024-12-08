
// components/ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import RoomMembers from './RoomMembers';

const ChatRoom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(import.meta.env.VITE_API_URL);

    wsRef.current.onopen = () => {
      // Set username when connection is established
      wsRef.current.send(JSON.stringify({
        type: 'SET_NAME',
        name: username
      }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'NAME_SET':
          console.log('Name set successfully');
          break;
        case 'ROOM_MEMBERS':
          setRoomMembers(data.members);
          break;
        case 'CHAT_MESSAGE':
        case 'SYSTEM':
          setMessages(prev => [...prev, {
            type: data.type,
            sender: data.sender,
            message: data.message,
            timestamp: data.timestamp
          }]);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [username]);

  const joinRoom = () => {
    if (roomId.trim() && wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'JOIN_ROOM',
        roomId: roomId.trim()
      }));
      setIsJoined(true);
      setMessages([]); // Clear messages when joining new room
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && wsRef.current && isJoined) {
      wsRef.current.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        roomId: roomId,
        message: newMessage.trim()
      }));
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {!isJoined ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Join a Room</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={joinRoom}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Room: {roomId}</h2>
              </div>
              <MessageList messages={messages} />
              <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-1">
            <RoomMembers members={roomMembers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
