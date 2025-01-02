"use client";

import NavbarLayout from "@/components/Layout/NavbarLayout";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Template = () => {
  const router = useRouter();
  return (
    <NavbarLayout>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-[28px] font-bold">Template</p>
          <p className="text-xs">
            Choose a template for the invoice you want to create
          </p>
        </div>
        <div className="flex flex-col gap-y-10">
          <div
            className="flex justify-between items-center border-b-2 pb-2 border-black"
            onClick={() => router.push("/create/azana")}
          >
            <p className="text-[40px] text-black">
              <i>AZANA</i>
            </p>
            <ArrowRight size={28} color="#000000" />
          </div>
          <div
            className="flex justify-between items-center border-b-2 pb-2 border-black"
            onClick={() => router.push("/create/braga")}
          >
            <p className="text-[40px] text-black">
              <i>BRAGA</i>
            </p>
            <ArrowRight size={28} color="#000000" />
          </div>
          <div
            className="flex justify-between items-center border-b-2 pb-2 border-black"
            onClick={() => router.push("/create/owabong")}
          >
            <p className="text-[40px] text-black">
              <i>OWABONG</i>
            </p>
            <ArrowRight size={28} color="#000000" />
          </div>
        </div>
        <div className="flex justify-center pb-8">
          <div>
            <div className="py-1 px-3 bg-black rounded-full">
              <p className="text-xs text-white">Coming soon</p>
            </div>
            <div className="mt-5" onClick={() => router.back()}>
              <p className="text-xs text-center">Back</p>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Template;
