import { MessageCircle, MessageSquareDot } from "lucide-react";
import userImage from "../assets/images/user.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
function Aside() {
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  function openhandle() {
    setOpen(!open);
  }

  console.log(open);

  useEffect(() => {
    axios.get("https://chat-ubzo.onrender.com/chats/users").then((response) => setUsers(response.data));
  }, []);
  // console.log(users);

  return (
    <div className="relative">
      <button
        onClick={openhandle}
        className="absolute top-[15px] z-[999] right-[-20px] bg-[#ffbd14] rounded-full w-[30px] h-[30px] flex items-center justify-center"
      >
        <ArrowRight color="#fff" />
      </button>
      <aside
        className={`${
          open ? "sm:max-w-[80px] xs:max-w-[80px] " : "sm:w-[400px] xs:w-[400px]"
        } aside   pl-[21px]  pr-[20px] pt-[15px] 2xl:overflow-y-scroll xl:overflow-y-scroll lg:overflow-y-scroll md:overflow-y-scroll sm:overflow-hidden xs:overflow-hidden  h-[100vh] border-r w-full`}
      >
        <div className="flex justify-between items-center mb-9">
          <div className="flex gap-3">
            <MessageCircle color="#cfcecc" />
            <span className="text-xl text-[#cfcecc]">Users</span>
          </div>
          <div className="flex">
            <button className="rounded-sm border px-2 py-1 bg-[#f5f5f5] text-[#bdbcb9]">EMAIL</button>
            <button className="rounded-sm border px-2 py-1 bg-[#ffbd14] text-[#fff]">CHAT</button>
          </div>
        </div>
        {users?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between transition-all duration-500 hover:text-[#fff]  rounded-md hover:bg-[#ffbd14]  py-2  mb-8 cursor-pointer"
          >
            <div className="flex gap-[15px] items-center ">
              <img className="w-11" src={userImage} alt="User" />
              <div>
                <p className="leading-4 uppercase font-semibold text-lg">{item.fullName}</p>
                <p className="text-sm w-[150px]  break-words">{item.email}</p>
              </div>
            </div>
            <MessageSquareDot color="#cfcecc" />
          </div>
        ))}
      </aside>
    </div>
  );
}

export default Aside;
