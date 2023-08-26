import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatInput from './ChatInput';

const StudentForum = () => {
  const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [studentId, setStudentId] = useState('');
   console.log(messages,"MESSSAGES");
    useEffect(() => {
        const studentid = localStorage.getItem('studentId');
        setStudentId(studentid)
    const newSocket = io('http://localhost:5000'); // Change the URL if needed
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  const sendMessage = (content) => {
    if (socket) {
      socket.emit('message', { content, sender: studentId }); // Replace 'studentId' with actual student ID
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1>Student Forum</h1>
          {messages.map((message, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <p>
                  <strong>{message.sender.username}:</strong> {message.content}
                </p>
              </div>
            </div>
          ))}
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default StudentForum;
