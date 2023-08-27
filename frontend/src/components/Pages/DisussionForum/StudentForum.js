import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessages';
import { axiosInstance } from '../../../connection'

const StudentForum = () => {
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Function to filter messages based on the search term
  const filterMessages = () => {
    const formattedSearchTerm = searchTerm.replace(/\s+/g, ''); // Remove spaces
    const regex = new RegExp(formattedSearchTerm, 'i'); // 'i' flag for case-insensitive search
    const filtered = messages.filter((message) =>
      regex.test(message.sender.username.replace(/\s+/g, '')) // Remove spaces from sender's username
    );
    setFilteredMessages(filtered);
  };
  

  useEffect(() => {
    filterMessages();
  }, [searchTerm, messages]);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    setStudentId(studentId);
    const newSocket = io('http://localhost:5000'); // Change the URL if needed
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    let response = await axiosInstance.get('/forum/messages');
    setMessages(response.data);
  }
  useEffect(() => {
    fetchMessages()
    if (socket) {
      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      socket.emit('join', { _id: studentId });
      socket.on('activeUsers', (users) => {
        setActiveUsers(users);
      });
    }
  }, [socket]);

  const sendMessage = (content) => {
    if (socket) {
      socket.emit('message', { content, sender: studentId });
    }
  };

  return (
    <>
      <div className="bg-faded p-3" style={{ color: 'red' }}>
        <h6>Search Chat by Username</h6>
        <div className="row">
          <div className="col-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search for a user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-4">

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={filterMessages}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid h-100" style={{ background: '#CAEDFF' }}>
        <div className="row h-100">
          <div className="col-md-8 p-0 d-flex flex-column">
            <div className="bg-faded p-3" style={{ color: 'red' }}>
              <h1>Student Forum</h1>
            </div>
            <div
              className="container p-3"
              style={{
                background: '#B9B4C7',
                // borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                className="overflow-auto"
                style={{ maxHeight: '65vh', padding: '10px' }}
              >
                {searchTerm ? (
                  filteredMessages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))
                ) : (
                  messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))
                )}
              </div>
              <ChatInput sendMessage={sendMessage} />
            </div>
          </div>
          <div className="col-md-4 p-0 bg-faded">
            <div
              className="container p-3 h-100"
              style={{ background: '#f0f0f0', overflowY: 'auto' }}
            >
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="d-flex align-items-center p-2"
                  style={{
                    color: user.isActive ? 'green' : 'red',
                    background: '#ffffff',
                    borderRadius: '10px',
                    margin: '5px',
                  }}
                >
                  <div
                    className="rounded-circle"
                    style={{
                      width: '10px',
                      height: '10px',
                      marginRight: '5px',
                      backgroundColor: user.isActive ? 'green' : 'red',
                    }}
                  />
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForum;
