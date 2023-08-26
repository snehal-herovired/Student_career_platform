import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <p className="card-text">
          <strong>{message.sender.name}:</strong> {message.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
