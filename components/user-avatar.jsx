"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { UserIcon } from "lucide-react";

const UserAvatar = () => {

    const {user} = useSelector(state => state.profile);
    if(!user){
        return <UserIcon/>
    }
  return (
    <Avatar classNam="w-4 h-4">
      {user?.gender === "female" ? (
        <AvatarImage src="/avatar_01.png" />
      ) : (
        <AvatarImage src="/avatar_02.png" />
      )}
      <AvatarFallback className="bg-slate-800">{user?.name[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
