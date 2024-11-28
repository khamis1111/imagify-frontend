"use client";

import { assets, plans } from "@/assets/assets";
import { Card } from "@/components/layout/Card";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { user, token, loadCredit, setOpenLogin } = useContext(AppContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = (planId) => {
    setLoading(true);
    user
      ? axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/stripe-session",
            {
              planId,
            },
            {
              headers: {
                token,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res.data) window.location.href = res.data?.session;
          })
          .catch((err) => {
            setLoading(false);
            toast({
              description:
                err.response?.data.msg || "Something is wrong, try again!",
            });
          })
      : setOpenLogin(true);
  };

  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");

  const verifyPayment = () => {
    setLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/webhook",
        { session_id },
        {
          headers: {
            token,
          },
        }
      )
      .then(async (res) => {
        await loadCredit();
        setLoading(false);
        toast({
          description: "Paid Successfully, Enjoy :)",
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session_id && token) {
      verifyPayment();
    }
  }, [session_id, token]);

  return (
    <>
      <div className="container flex flex-col justify-center gap-y-8 max-w-[80rem] mx-auto pb-2">
        <div className="flex justify-center">
          <div className="py-2 px-10 w-max bg-white border rounded-full border-borderGray text-base font-normal">
            Our Plans
          </div>
        </div>

        <p className="text-4xl font-medium text-center">Choose the plan</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {plans.map((data, index) => (
            <Card
              key={index}
              className={
                "flex flex-col items-start justify-center gap-y-6 w-full p-10 !bg-white"
              }
            >
              <div className="relative w-8 h-8">
                <Image
                  src={assets.logo_icon}
                  alt="LOGO"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <p className="font-medium text-xl">{data.id}</p>
                <p className="font-normal text-sm">{data.desc}</p>
              </div>

              <p className="font-medium text-4xl text-[#515151]">
                ${data.price}{" "}
                <span className="font-normal text-sm">
                  / ${data.credits} credits
                </span>
              </p>

              <p className="text-base font-normal text-textGray">{data.text}</p>

              <Button
                className="w-full h-11"
                onClick={() => handlePayment(data.id)}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Get started"}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {loading && (
        <div className="absolute top-0 w-screen h-screen bg-black/70 flex items-center justify-center animate-pulse">
          <div className="font-semibold text-white tracking-wider text-3xl md:text-5xl text-center">
            Please waiting...
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
