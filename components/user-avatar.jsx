"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { apiConnector } from "@/helpers/apiConnector";
import { toast } from "sonner";
import { setUserDetails } from "@/redux/slices/profileSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    const { data } = await apiConnector("GET", "/api/logout");
    if (data.success) {
      toast.success("Logout Successful");
      dispatch(setUserDetails(null));
      Cookies.remove("token");
      Cookies.remove("userType");
      router.push("/");
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <Avatar>
          {user.gender === "female" ? (
            <AvatarImage src="avatar_01.png" />
          ) : (
            <AvatarImage src="avatar_02.png" />
          )}
          <AvatarFallback className="bg-slate-800 text-white">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit py-1 px-2">
        <Button
          className="flex text-rose-500 hover:text-rose-700 items-center justify-center gap-3"
          variant="ghost"
          onClick={logoutHandler}
        >
          {" "}
          <LogOutIcon className="w-5 h-5" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
