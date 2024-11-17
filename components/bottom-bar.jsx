"use client"
import { MdAppRegistration, MdEvent,MdHome, MdEmojiEvents } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import Link from "next/link";
import { PiUserCircleLight } from "react-icons/pi"; 
import { useSelector } from "react-redux";  
import { usePathname } from "next/navigation"; 
import { cn } from "@/lib/utils";
const links = [
  {
    label: "Home",
    icon: <MdHome />,
    href: "/",
  },
  {
    label: "Events",
    icon: <MdEmojiEvents />,
    href: "/events",
  },
  {
    label: "Enroll",
    icon: <MdAppRegistration />,
    href: "/eventregistration",
  },
  {
    label: "My Events",
    icon: <MdEvent />,
    href: "/participation",
  },
  {
    label: "Profile",
    icon: <PiUserCircleLight />,
    href: "/profile",
  },
];


const BottomBar = () => {
    const {user} = useSelector(state => state.profile);
    const pathname = usePathname();  
    if(!user || user?.userType !== "participant"){
        return null;
    }

  return (
    <div className="bg-slate-600 w-full md:hidden z-50 text-white fixed bottom-0">
      <div className="w-11/12 mx-auto flex justify-between">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn("flex flex-col gap-1 p-2 px-3 items-center justify-center text-white/50",pathname=== item.href && "border-t-2 text-white")}
          >
            <div className="text-xl"> {item.icon}</div>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
