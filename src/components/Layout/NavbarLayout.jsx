"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { LogOut, SquareArrowOutUpRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavbarLayout = ({ children }) => {
  const date = new Date();
  const year = date.getFullYear();
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center pr-2 py-2 pl-[30px]">
        <Link
          href="/about"
          className="flex gap-x-1 items-end border-1 border-black rounded-[4px] px-2 py-1 bg-black"
        >
          <p className="text-sm text-white font-light leading-none">About</p>
          <SquareArrowOutUpRight size={14} color="#ffffff" />
        </Link>
        <Dropdown
          size="sm"
          classNames={{
            base: "bg-white border-2 border-black rounded-lg p-0",
            content: "text-right rounded-lg p-0",
          }}
        >
          <DropdownTrigger>
            <Button
              endContent={<LogOut size={16} color="#ffffff" />}
              isIconOnly
              radius="full"
              className="bg-black"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem textValue="Log out" key="new" onPress={handleLogout}>
              <p className="font-semibold">Log out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="w-full h-full p-8">{children}</div>
      <div className="bg-black p-1">
        <div>
          <p className="text-white text-[10px] text-center">
            {`© ${year} Brillian Azhar D. All rights reserved.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
