"use client";

import React, { useContext, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Lock, Mail, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const SignUpPage = ({ setStatus }) => {
  const { setToken, setUser } = useContext(AppContext);
  const { isLoaded, signUp, setActive } = useSignUp();

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        username: form.name,
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setLoading(false);
      setPendingVerification(true);
    } catch (err) {
      setLoading(false);
      toast({
        description: `${err.message}` || "Something is wrong, try again!",
      });
      console.log(err);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/register`,
            {
              name: form.name,
              email: form.email,
              password: form.password,
            }
          );

          if (data) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.data);
            setOpenLogin(false);
            setPendingVerification(false);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          toast({
            description:
              error.response?.data.msg || "Something is wrong, try again!",
          });
        }
      } else {
        setLoading(false);
        toast({
          description:
            `Verification incomplete: ${completeSignUp}` ||
            "Something is wrong, try again!",
        });
      }
    } catch (err) {
      setLoading(false);
      toast({
        description:
          `Verification error: ${err.message}` ||
          "Something is wrong, try again!",
      });
    }
  };

  return !pendingVerification ? (
    <div className="space-y-2">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="flex items-center gap-x-2 px-6 py-2 border border-[#D3D3D3] rounded-full">
          <UserRound color="#B9B9B9" size={23} />
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent outline-none w-full text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
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
          className="text-base text-white w-full bg-mainColor font-normal rounded-full py-6"
          onClick={onSignUpPress}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Register"}
        </Button>
      </div>
      {/* SignUp */}
      <p className="text-textGray text-base font-normal text-center">
        Already have an account?{" "}
        <Button
          variant={"link"}
          className="text-mainColor text-base font-normal p-0"
          onClick={() =>
            setStatus((prev) => (prev === "login" ? "register" : "login"))
          }
          disabled={loading}
        >
          Sign In
        </Button>
      </p>
    </div>
  ) : (
    <div className="space-y-2">
      {/* Inputs */}
      <div className="flex justify-center mb-5">
        <InputOTP maxLength={6} onChange={setCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {/* Button */}
      <div className="">
        <Button
          className="text-base text-white w-full bg-mainColor font-normal rounded-full py-6"
          onClick={onPressVerify}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Verify"}
        </Button>
      </div>
      {/* Login */}
      <div className="text-textGray text-base font-normal text-center">
        Back to login?{" "}
        <Button
          variant={"link"}
          className="text-mainColor text-base font-normal p-0 m-0"
          onClick={() => {
            setStatus((prev) => (prev === "login" ? "register" : "login"));
            setPendingVerification(false);
          }}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
