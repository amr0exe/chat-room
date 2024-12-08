// components/MessageList.js
import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 ${
            msg.type === 'SYSTEM' 
              ? 'text-gray-500 text-center' 
              : msg.isSelf 
                ? 'ml-auto mr-0 text-right' 
                : 'mr-auto ml-0'
          } max-w-[80%]`}
        >
          <div 
            className={`rounded-lg p-3 inline-block ${
              msg.type === 'SYSTEM' 
                ? 'bg-gray-100' 
                : msg.isSelf 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200'
            }`}
          >
            {msg.type !== 'SYSTEM' && (
              <div className={`font-bold ${msg.isSelf ? 'text-white' : 'text-gray-700'}`}>
                {msg.sender}
              </div>
            )}
            <div className="break-words">{msg.message}</div>
            <div className={`text-xs ${msg.isSelf ? 'text-blue-100' : 'text-gray-500'}`}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;