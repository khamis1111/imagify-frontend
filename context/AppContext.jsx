"use client";

import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const loadCredit = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/credits",
        {
          headers: {
            token,
          },
        }
      );

      if (data) {
        setUser(data.data);
      }
    } catch (error) {
      toast({
        description:
          "Error: " + err.response?.data ||
          err.message ||
          err.response?.data.msg ||
          "Something is wrong, try later!",
      });
    }
  };

  const imageGenerate = async (prompt) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/image-generate",
        { prompt },
        {
          headers: {
            token,
          },
        }
      );

      if (data) {
        loadCredit();
        return data.data;
      }
    } catch (error) {
      if (user.credits === 0) router.push("/plans");
      loadCredit();
      toast({
        description:
          "Error: " + error.response?.data.msg ||
          error.message ||
          "Something is wrong, try later!",
      });
    }
  };

  useEffect(() => {
    if (token) loadCredit();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        openLogin,
        setOpenLogin,
        token,
        setToken,
        imageGenerate,
        loadCredit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
