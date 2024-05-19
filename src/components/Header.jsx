import { User, Bell } from "lucide-react";
function Header() {
  return (
    <header className="border-b">
      <nav className="px-7 py-5 flex items-center justify-between">
        <a href="#" className="text-[#ffbd14] font-bold text-xl">
          ASSAB TEAM
        </a>
        <div className="flex items-center gap-6">
          <button className="border-[2px] px-[5px] hover:scale-105 transition-all py-[5px] text-gray-400 rounded-md">NEED HELP</button>
          <Bell color="#cfcecc"/>
          <User color="#cfcecc"/>
        </div>
      </nav>
    </header>
  );
}

export default Header;
