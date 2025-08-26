import React, { useState } from "react";
// import Modal from "react-modal";
import Draggable from "react-draggable"; // Import react-draggable
import styles from "./Chatbot.module.css"; // Import updated CSS module
import img1 from "../images/icon.jpeg";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [message, setMessage] = useState(""); // Input message
  const [chat, setChat] = useState([]); // Chat history
  const [isTyping, setIsTyping] = useState(false); // Typing indicator

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending message
  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    // Add user's message to chat
    const newChat = [
      ...chat,
      { sender: "user", text: message, timestamp: new Date().toLocaleTimeString() },
    ];
    setChat(newChat);
    setMessage("");

    // Simulate AI typing
    setIsTyping(true);

    try {
      // Send message to backend
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Add AI response to chat
      setTimeout(() => {
        setChat([
          ...newChat,
          { sender: "ai", text: data.reply, timestamp: new Date().toLocaleTimeString() },
        ]);
        setIsTyping(false);
      }, 1000); // Simulated delay
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Draggable Floating Icon and Label */}
      <Draggable>
        <div className={styles.chatbotWrapper}>
          <div className={styles.chatbotIcon} onClick={toggleModal}>
            <img src={img1} alt="AI Trainer" />
          </div>
          <p className={styles.chatbotText}>AI Personal Assistant</p>
        </div>
      </Draggable>

      {/* Chat Modal */}
      {isOpen && (
        <div className={styles.chatModal}>
          <div className={styles.chatContainer}>
            <div className={`${styles.chatHeader} text-center`}>
              <h2>Coachly</h2>
              <button className={`${styles.closeButton} text-end`} onClick={toggleModal}>
                ✕
              </button>
            </div>
            <div className={styles.chatBody}>
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={msg.sender === "user" ? styles.userMsgContainer : styles.aiMsgContainer}
                >
                  <p className={styles.chatBubble}>{msg.text}</p>
                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </div>
              ))}
              {isTyping && <p className={styles.typingIndicator}>Typing...</p>}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me something..."
                className={styles.chatInput}
              />
              <button onClick={sendMessage} className={styles.sendButton}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
