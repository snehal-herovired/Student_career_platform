import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className="card mb-2" style={{border:'1px solid #FAF1E4'}}>
      <div className="card-body">
        <p className="card-text">
          <strong>{message.sender.username}:</strong> {message.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
