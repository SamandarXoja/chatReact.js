import { Route, Routes, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Login from "./pages/login";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";

function App() {
  const [chats, setChats] = useState([]);
  const socket = io.connect("https://chat-ubzo.onrender.com", {
    transports: ["websocket"],
  });

  useEffect(() => {
    fetchChats();

    socket.on("chatsList", (receivedChats) => {
      console.log("Received chats:", receivedChats);
      setChats(receivedChats);
    });

    return () => {
      socket.off("chatsList");
    };
  }, []);

  function fetchChats() {
    fetch("https://chat-ubzo.onrender.com/chats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched chats:", data);
        setChats(data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }

  const location = useLocation();

  const shouldShowAside = () => {
    const { pathname } = location;

    return !["/auth", "/"].includes(pathname);
  };

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home chats={chats} socket={socket} />} />
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
