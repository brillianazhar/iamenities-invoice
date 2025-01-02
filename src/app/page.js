"use client";

import NavbarLayout from "@/components/Layout/NavbarLayout";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <NavbarLayout>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <p>Hello,</p>
          <p className="text-[20px] font-bold">Welcome to inVOICE</p>
          {/* <p className="text-xs font-light">home where everything begins !</p> */}
        </div>
        <div>
          <p>
            <span className="font-bold">inVOICE</span> is an online invoice
            generator where you can create invoices using available templates,
            which can then be exported as PDF files. This website is part of my
            portfolio, so it may have some limitations as it is primarily
            designed for personal use. Feel free to explore and enjoy using this
            website !
          </p>
        </div>
        <div className="w-full">
          <Button
            onPress={() => router.push("/template")}
            radius="full"
            className="w-full bg-black text-white"
          >
            <p className="font-light">Create Invoice</p>
          </Button>
        </div>
      </div>
    </NavbarLayout>
  );
}
