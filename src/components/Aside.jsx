import { MessageCircle, MessageSquareDot } from "lucide-react";
import userImage from "../assets/images/user.png";
function Aside() {
  return (
    <aside className="aside px-7 pt-[15px] h-dvh border-r max-w-[400px] w-full ">
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
      <div className="flex items-center justify-between transition-all duration-500 hover:text-[#fff]  rounded-md hover:bg-[#ffbd14] px-4 py-2  mb-8 cursor-pointer">
        <div className="flex gap-[15px] items-center ">
          <img className="w-11" src={userImage} alt="User" />
          <div>
            <p className="leading-4 uppercase font-semibold text-lg">John Doe</p>
            <span className="text-sm">Lorem, ipsum dolor.</span>
          </div>
        </div>
        <MessageSquareDot color="#cfcecc" />
      </div>
    </aside>
  );
}

export default Aside;
