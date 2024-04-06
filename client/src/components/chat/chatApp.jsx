// import React, { useState } from 'react';
// import './chatapp.css'; // Import CSS for styling

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSendMessage = () => {
//     if (inputText.trim() !== '') {
//       setMessages([...messages, inputText]);
//       setInputText('');
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Chat App</h1>
//       <div className="chat-box">
//         {messages.map((message, index) => (
//           <div key={index} className="message">{message}</div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={inputText}
//           onChange={handleInputChange}
//           placeholder="Type your message..."
//           className="input-field"
//         />
//         <button onClick={handleSendMessage} className="send-button">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
// Chat.js

import React, { useState, useEffect } from 'react';

const Chat = ({ userEmail }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages for the current user
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Fetch messages from the server for the current user
      const response = await fetch(`/messages?userId=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      // Send the new message to the server
      await fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userEmail, message: newMessage }),
      });
      // Fetch updated messages after sending the new message
      fetchMessages();
      // Clear the input field after sending the message
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <div>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
