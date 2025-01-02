"use client";

import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
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
    <div className="flex flex-col justify-between min-h-screen p-8">
      <div className="flex justify-center">
        <p className="text-3xl text-black pt-10">
          in<span className="font-bold text-4xl">VOICE.</span>
        </p>
      </div>
      <div className="w-full flex flex-col justify-center gap-y-[50px]">
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col justify-center gap-y-[50px]"
        >
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
            <Button type="submit" radius="full" className="bg-black text-white">
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
  );
};

export default Login;
