"use client";

import { Button, Input } from "@nextui-org/react";
import { AlertCircle, Eye, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const date = new Date();
  const year = date.getFullYear();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsInvalid(false);
    setLoading(true);
    signIn("credentials", {
      identifier: identifier,
      password: password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          return router.push("/");
        }
        setIsInvalid(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex h-full flex-col justify-between p-8">
        <div className="flex flex-col items-center justify-center pt-10">
          <p className="text-3xl text-black">
            in<span className="font-bold text-4xl">VOICE.</span>
          </p>
          <div className="bg-black py-1 px-[6px]">
            <p className="text-xs text-white">Intan Amenities Invoice</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-y-[50px]">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col justify-center gap-y-[50px]"
          >
            {isInvalid && (
              <div className="flex gap-x-1 justify-center border-1 border-red-400 px-3 py-1 bg-red-400">
                <AlertCircle size={16} color="#ffffff" />
                <p className="text-xs text-white">
                  Invalid username / password
                </p>
              </div>
            )}
            <div className="flex flex-col gap-y-[30px]">
              <Input
                label="Username"
                labelPlacement="outside"
                placeholder="Enter your username"
                variant="bordered"
                radius="full"
                classNames={{ label: "text-xs" }}
                value={identifier}
                onValueChange={setIdentifier}
                autoComplete="off"
              />
              <Input
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff size={16} color="#9ca3af" />
                    ) : (
                      <Eye size={16} color="#9ca3af" />
                    )}
                  </button>
                }
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                radius="full"
                classNames={{ label: "text-xs" }}
                value={password}
                onValueChange={setPassword}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <Button
                type="submit"
                radius="full"
                className="bg-black text-white"
                isLoading={loading}
                isDisabled={loading}
              >
                <p className="text-xs font-bold">Login</p>
              </Button>
              <p className="text-[11px] text-center">
                Don't know the credentials? Contact admin for credential
                information
              </p>
            </div>
          </form>
        </div>
      </div>
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

export default Login;
