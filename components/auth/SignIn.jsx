"use client";

import React, { useState, useContext } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export default function SignInPage({ setStatus }) {
  const { setToken, setUser, setOpenLogin } = useContext(AppContext);
  const { signIn, setActive, isLoaded } = useSignIn();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      if (data) {
        Cookies.set("token", data.token);
        setToken(data.token);
        setUser(data.data);

        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          });

          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            setLoading(false);
            setOpenLogin(false);
          } else {
            setLoading(false);
            toast({
              description:
                `Sign-in incomplete: ${JSON.stringify(
                  signInAttempt,
                  null,
                  2
                )}` || "Something is wrong, try again!",
            });
          }
        } catch (err) {
          setLoading(false);
          toast({
            description:
              `Error during sign-in: ${JSON.stringify(err, null, 2)}` ||
              "Something is wrong, try again!",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast({
        description:
          error.response?.data.msg || "Something is wrong, try again!",
      });
    }
  };

  return (
    <div className="space-y-2">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="flex items-center gap-x-2 px-6 py-2 border border-[#D3D3D3] rounded-full">
          <Mail color="#B9B9B9" size={23} />
          <input
            type="text"
            placeholder="Email id"
            className="bg-transparent outline-none w-full text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-x-2 px-6 py-2 border border-[#D3D3D3] rounded-full">
          <Lock color="#B9B9B9" size={23} />
          <input
            type="text"
            placeholder="Password"
            className="bg-transparent outline-none w-full text-sm"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      </div>
      {/* Login */}
      <div className="">
        <Button
          className="text-sm text-mainColor w-max font-normal p-0 m-0"
          variant={"link"}
          disabled={loading}
        >
          Forgot password?
        </Button>

        <Button
          className="text-base text-white w-full bg-mainColor font-normal rounded-full py-6"
          onClick={onSignInPress}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>
      </div>
      {/* SignUp */}
      <p className="text-textGray text-base font-normal text-center">
        Don’t have an account?
        <Button
          variant={"link"}
          className="text-mainColor text-base font-normal p-0"
          onClick={() =>
            setStatus((prev) => (prev === "login" ? "register" : "login"))
          }
          disabled={loading}
        >
          Sign up
        </Button>
      </p>
    </div>
  );
}
