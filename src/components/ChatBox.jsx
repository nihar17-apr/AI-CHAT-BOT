import { useState } from "react";
import axios from "axios";
import Message from "./Message";
import InputBox from "./InputBox";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: userInput }],
            },
          ],
        }
      );

      const botReply =
        response.data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        {
          text: botReply,
          sender: "bot",
        },
      ]);
    } catch (error) {
  console.log(error.response?.data);

  setMessages((prev) => [
    ...prev,
    {
      text: "API Error",
      sender: "bot",
    },
  ]);
}
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
          />
        ))}
      </div>

      <InputBox
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default ChatBox;