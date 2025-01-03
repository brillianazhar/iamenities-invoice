import NavbarLayout from "@/components/Layout/NavbarLayout";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <NavbarLayout>
      <div className="flex flex-col gap-y-10">
        <p className="font-light">Hello,</p>
        <p className="font-light">
          <span className="font-bold">inVOICE</span> is a portfolio website
          where you can create invoices online using the available templates.
          Currently, the website is intended for personal use, specifically for
          Intan Amenities, a small business, to help generate hotel sandal
          invoices. Future updates with additional features will be coming soon.
        </p>
        <div className="font-light">
          <p className="text-xs">Best regards,</p>
          <p className="text-sm">Brillian Azhar Danetta</p>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Link
          href="/"
          className="bg-black p-1 flex gap-x-1 items-center justify-end rounded-md"
        >
          <ArrowLeft size={12} color="#ffffff" />
          <p className="text-xs font-light text-white">Back to home</p>
        </Link>
      </div>
      <div className="flex flex-col mt-10 p-1">
        <div className="flex gap-x-1 items-center">
          <Mail color="#000000" size={12} />
          <p className="font-light text-xs">brilianazhardanet@gmail.com</p>
        </div>
        <div className="flex gap-x-1 items-center">
          <MapPin color="#000000" size={12} />
          <p className="font-light text-xs">Central Java</p>
        </div>
        <div className="flex gap-x-1 items-center">
          <Phone color="#000000" size={12} />
          <p className="font-light text-xs">+6285842626890</p>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default About;
