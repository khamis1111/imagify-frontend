"use client";

import { assets } from "@/assets/assets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import SignUpPage from "@/components/auth/SignUp";
import SignInPage from "@/components/auth/SignIn";
import { useAuth, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";

const LoginButton = ({ setOpenLogin, openLogin }) => {
  const [status, setStatus] = useState("login");

  return (
    <Dialog onOpenChange={setOpenLogin} open={openLogin}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-12 py-5 font-normal text-base">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 max-w-[24rem]">
        {/* Header */}
        <DialogHeader className="mb-7">
          <DialogTitle className="text-3xl font-medium text-center">
            {status === "login" ? "Login" : "Register"}
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-center">
            {status === "login"
              ? "Welcome back! Please sign in to continue"
              : "Welcome back! Please sign up to continue"}
          </DialogDescription>
        </DialogHeader>
        {/* Body */}
        {status === "login" ? (
          <SignInPage setStatus={setStatus} />
        ) : (
          <SignUpPage setStatus={setStatus} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const MobileNavbar = () => {
  const { signOut } = useAuth();
  const { setUser, user } = useContext(AppContext);
  const userAuth = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="border border-input bg-background shadow-sm cursor-pointer p-2 rounded-lg">
          <Text size={30} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <div className="flex flex-col gap-y-5">
          {/* Logo */}
          <SheetClose asChild>
            <Button
              variant={"ghost"}
              className="relative w-32 h-10 mb-5"
              asChild
            >
              <Link href={"/"}>
                <Image
                  src={assets.logo}
                  alt="LOGO"
                  fill
                  className="object-contain"
                />
              </Link>
            </Button>
          </SheetClose>

          {user ? (
            <>
              {/* Profile */}
              <div className="flex justify-start items-center gap-x-2 rounded-full">
                <div className="relative w-11 h-11 drop-shadow-md">
                  <Image
                    src={assets.profile_icon}
                    alt="Credits"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="-space-y-1">
                  <p className="font-medium text-base">
                    Hi! {userAuth.user?.username || user.name}
                  </p>
                  <p className="font-normal text-sm text-textGray">
                    Basic User
                  </p>
                </div>
              </div>
              {/* Credits */}
              <Link
                href={"/plans"}
                className="bg-[#D7EBFF] py-3 px-6 rounded-full flex items-center gap-x-2"
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={assets.credit_star}
                    alt="Credits"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-normal text-base">
                  Credits left: {user.credits}
                </p>
              </Link>

              <div
                className={`w-full p-3 bg-red-500 text-white shadow-md rounded-full`}
              >
                <p
                  onClick={() => {
                    Cookies.remove("token");
                    setUser(false);
                    signOut();
                  }}
                >
                  Logout
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Pricing */}
              <SheetClose asChild>
                <Button
                  variant={"outline"}
                  className="text-base py-5 rounded-full"
                  asChild
                >
                  <Link href={"/plans"}>Pricing</Link>
                </Button>
              </SheetClose>
              {/* Login */}
              <LoginButton />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  const { setUser, user, openLogin, setOpenLogin } = useContext(AppContext);
  const [openProfile, setOpenProfile] = useState(false);

  // Clerk
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const userAuth = useUser();

  return (
    <div className="container py-5 mb-14 flex items-center justify-between">
      <div className="relative w-32 h-10">
        <Link href={"/"}>
          <Image src={assets.logo} alt="LOGO" fill className="object-contain" />
        </Link>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-x-5">
        {isSignedIn || Cookies.get("token") ? (
          isLoaded && user ? (
            <>
              {/* Credits */}
              <Link
                href={"/plans"}
                className="bg-[#D7EBFF] py-3 px-6 rounded-full flex items-center gap-x-2 w-max"
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={assets.credit_star}
                    alt="Credits"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-normal text-base">
                  Credits left: {user.credits}
                </p>
              </Link>
              {/* Profile */}
              <div
                className="flex items-center gap-x-2 w-max relative cursor-pointer"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                <div className="relative w-11 h-11 drop-shadow-md">
                  <Image
                    src={assets.profile_icon}
                    alt="Credits"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="-space-y-1">
                  <p className="font-medium text-base">
                    Hi! {userAuth.user?.username || user.name}
                  </p>
                </div>

                <div
                  className={`absolute top-12 w-full p-2 bg-slate-50 shadow-md rounded-md ${
                    openProfile ? "block" : "hidden"
                  }`}
                >
                  <p
                    className="hover:bg-slate-100 rounded-md p-1 cursor-pointer"
                    onClick={() => {
                      Cookies.remove("token");
                      setUser(false);
                      signOut();
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="rounded-full w-36 h-11" />

              <div className="flex items-center gap-2">
                <Skeleton className="w-11 h-11 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
            </>
          )
        ) : (
          <>
            {/* Pricing */}
            <Button variant={"link"} className="text-base p-0 m-0" asChild>
              <Link href={"/plans"}>Pricing</Link>
            </Button>
            {/* Login */}
            <LoginButton setOpenLogin={setOpenLogin} openLogin={openLogin} />
          </>
        )}
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
