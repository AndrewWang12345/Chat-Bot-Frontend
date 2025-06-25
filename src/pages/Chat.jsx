import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenerateRoute = "http://localhost:8000/generate"; // replace with your actual backend URL
const SaveChatRoute = "http://localhost:8000/api/chat/save"; // your backend route to save chat
const LoadChatRoute = "http://localhost:8000/api/chat/history"; // your backend route to load chat history

export default function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // {sender: "user"|"ai", message: string}
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };

  useEffect(() => {
    // Check for logged-in user
    const savedUser = localStorage.getItem("chat-app-user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(savedUser));
  }, [navigate]);

  useEffect(() => {
    // Load chat history from backend when currentUser set
    if (!currentUser) return;
    const loadChatHistory = async () => {
      try {
        const res = await axios.get(`${LoadChatRoute}/${currentUser.username}`);
        setChatHistory(res.data); // expect list of {sender, message}
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    loadChatHistory();
  }, [currentUser]);

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = input.trim();
  setChatHistory((prev) => [...prev, { sender: "user", message: userMessage }]);
  setInput("");
  setLoading(true);

  try {
    // Send as FormData to match FastAPI Form(...) params

    const res = await axios.post(GenerateRoute, {
      username: currentUser.username,
      question: userMessage,
    });

    const aiMessage = res.data.generated_text || "Sorry, no response.";

    setChatHistory((prev) => [...prev, { sender: "ai", message: aiMessage }]);

    // Save chat (you can remove this if generate already stores it)
    // await axios.post(SaveChatRoute, {
    //   username: currentUser.username,
    //   question: userMessage,
    //   answer: aiMessage,
    // });
  } catch (error) {
    console.error("Error generating or saving chat:", error);
    setChatHistory((prev) => [
      ...prev,
      { sender: "ai", message: "Error occurred. Try again later." },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <Header>
        <h2>LLM Chat App</h2>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <ChatWindow>
        {chatHistory.map((chat, idx) => (
          <Message key={idx} sender={chat.sender}>
            {chat.message}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatWindow>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <SubmitButton type="submit" disabled={loading || input.trim() === ""}>
          {loading ? "Generating..." : "Send"}
        </SubmitButton>
      </Form>
    </Container>
  );

}

// Styled components with your original dark purple color scheme
const Header = styled.div`
  width: 85vw;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 1rem;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: #997af0;
  border: 1px solid #997af0;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: #997af0;
    color: white;
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

const ChatWindow = styled.div`
  flex: 1;
  width: 85vw;
  max-width: 800px;
  background-color: #00000076;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 70%;
  background-color: ${({ sender }) => (sender === "user" ? "#4e0eff" : "#292b2f")};
  color: white;
  align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  white-space: pre-wrap;
`;

const Form = styled.form`
  width: 85vw;
  max-width: 800px;
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  background-color: #1a1a2e;
  color: white;
`;

const SubmitButton = styled.button`
  background-color: #997af0;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #4e0eff;
  }
`;
