import React, { useState } from 'react';
import './chatapp.css'; // Import CSS for styling

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };

  return (
    <div className="container">
      <h1>Chat App</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
