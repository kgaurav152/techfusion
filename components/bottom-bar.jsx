"use client"
import { MdAppRegistration, MdHome, MdEmojiEvents } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import Link from "next/link";
import { PiUserCircleLight } from "react-icons/pi";
import UserAvatar from "./user-avatar";
import { useSelector } from "react-redux";

const links = [
  {
    label: "Home",
    icon: <MdHome />,
    href: "/",
  },
  {
    label: "Event",
    icon: <MdEmojiEvents />,
    href: "/events",
  },
  {
    label: "Registration",
    icon: <MdAppRegistration />,
    href: "/eventregistration",
  },
    {
      label: "Enrolled In",
      icon: <TiGroup />,
      href: "/participation",
    },
  {
    label: "Profile",
    icon: <PiUserCircleLight/>,
    href: "/profile",
  },
];

const BottomBar = () => {
    const {user} = useSelector(state => state.profile);
    console.log(user)
    if(!user || user?.userType !== "participant"){
        return null;
    }

  return (
    <div className="bg-slate-600 py-2 w-full md:hidden z-50 text-white fixed bottom-0">
      <div className="w-11/12 mx-auto flex justify-between ">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-5 h-5"> {item.icon}</div>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
