"use client";

import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Check = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (loading == false) {
      const timeoutId = setTimeout(() => {
        route.push("/");
      }, 3500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <Spinner color="default" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <img src="/check2.gif" alt="" />
    </div>
  );
};

export default Check;
