import Aside from "../components/Aside";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
    // Подписываемся на событие 'chatsList' от сокета
    socket.on("chatsList", (receivedChats) => {
      setChatList(receivedChats); // Обновляем chatList при получении новых чатов
      console.log("Received chats:", receivedChats);
    });

    return () => {
      // Отписываемся от события при размонтировании компонента
      socket.off("chatsList");
    };
  }, [socket]); // Подписываемся на изменения сокета

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
      // Добавляем новый чат в chatList
      setChatList([...chatList, newChat]);
    } catch (error) {
      console.log(error);
    }
    reset();
  }

  return (
    <div className="flex gap-x-[15px]">
      <Aside />
      <div className="flex-1 flex flex-col justify-between py-[40px]">
        <div>
          {chatList?.map((item, index) => (
            <p className="max-w-[400px] mb-5" key={index}>
              <span className="bg-violet-600 rounded-full max-w-[60px] text-white p-2">{item.text}</span>
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            type="text"
            className="border-[2px] outline-none p-[10px] border-gray-200 rounded-md h-[100px] max-w-[500px] w-full"
            {...register("text", { required: true })}
          />
          <button className="block bg-[#295498] text-[#fff] max-w-[100px] w-full  rounded-md py-2">send</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
