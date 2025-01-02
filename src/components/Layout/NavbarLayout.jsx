"use client";

import { Button } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const NavbarLayout = ({ children }) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-2">
        <Button
          endContent={<LogOut size={16} color="#ffffff" />}
          isIconOnly
          radius="full"
          className="bg-black"
          onPress={handleLogout}
        />
      </div>
      <div className="w-full h-full p-8">{children}</div>
    </div>
  );
};

export default NavbarLayout;
