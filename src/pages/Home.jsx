import Aside from "../components/Aside";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Send, BringToFront } from "lucide-react";

function Home({ chats, socket }) {
  const [chatList, setChatList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  useEffect(() => {
    const handleNewChatMessage = (newChat) => {
      setChatList((prevChats) => {
        // Проверяем, не было ли это сообщение уже добавлено
        if (!prevChats.some((chat) => chat._id === newChat._id)) {
          return [...prevChats, newChat];
        }
        return prevChats;
      });
    };

    socket.on("chatMessage", handleNewChatMessage);

    return () => {
      socket.off("chatMessage", handleNewChatMessage);
    };
  }, [socket]);

  async function onSubmit(data) {
    try {
      const response = await fetch("https://chat-ubzo.onrender.com/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newChat = await response.json();
      // После успешной отправки на сервер, сервер должен уведомить всех через WebSocket
      // Убедитесь, что сервер отправляет это сообщение обратно через WebSocket
      // socket.emit('newChatMessage', newChat);
    } catch (error) {
      console.log(error);
    }
    reset();
  }

  async function deleteChats(id) {
    try {
      const response = await fetch(`https://chat-ubzo.onrender.com/chats/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setChatList((prevChats) => prevChats.filter((chat) => chat._id !== id));
      } else {
        console.error("Failed to delete chat");
      }
    } catch (error) {
      console.log(error);
    }
  }



  // https://chat-ubzo.onrender.com/chats/users

  return (
    <>
      <Header />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {chatList?.map((item, index) => (
              <p
                onClick={() => deleteChats(item._id)}
                className="ml-6 cursor-pointer max-w-[400px] mb-5 mt-6"
                key={item._id}
              >
                <span className="bg-violet-600 rounded-full max-w-[60px] text-white p-2">{item.text}</span>
              </p>
            ))}
          </div>

          <div className=" border-t px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-center">
              <BringToFront color="#cfcecc" />
              <textarea
                type="text"
                placeholder="Type here..."
                className="border-none  pt-[25px] outline-none w-full"
                {...register("text", { required: true })}
              />
              <button className="">
                <Send color="#ffbd14" />{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
