import React, { useEffect } from 'react';
import './MessageModal.css';

const MessageModal = ({ message, onClose }) => {
  if (!message || !message.text) return null; 

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('message-modal')) {
      onClose();
    }
  };


  return (
    <div className="message-modal" onClick={handleBackgroundClick}>
      <div className="message-content">
        <h3>{message.type === 'success' ? 'Успех!' : 'Ошибка'}</h3>
        <p>{message.text}</p>
        <button className="close-message-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default MessageModal;
