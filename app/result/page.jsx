"use client";

import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Loader2, SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user, imageGenerate } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);

  const [image, setImage] = useState(assets.sample_img_1);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgResult = await imageGenerate(prompt);
    if (imgResult) {
      setImage(imgResult);
      setIsImageGenerated(true);
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-y-8 max-w-[50rem] mx-auto">
      <div className="">
        <div className="w-[200px] h-[200px] md:w-[393px] md:h-[393px] relative">
          <Image
            src={image}
            alt="STAR"
            fill
            className="object-contain rounded-lg drop-shadow-md"
          />
          <span
            className={`absolute bottom-0 h-1 bg-mainColor ${
              loading ? "w-full transition-all duration-10s" : "w-0"
            }`}
          />
        </div>
        {loading && <p className="text-base font-medium">Loading...</p>}
      </div>

      {!isImageGenerated && (
        <div className="bg-[#6B6B6B] p-2 rounded-full w-full flex items-center gap-1">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Describe what you want to generate !"
            className="w-full h-full p-2 bg-transparent outline-none text-white font-medium text-base placeholder:text-white"
          />
          <Button
            className="rounded-full w-11 h-11"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin">
                <Loader2 />
              </div>
            ) : (
              <SendHorizonal />
            )}
          </Button>
        </div>
      )}

      {isImageGenerated && (
        <div className="flex items-center gap-2">
          <Button
            className="rounded-full px-4 py-6"
            variant={"outline"}
            onClick={() => setIsImageGenerated(false)}
            disabled={loading}
          >
            Another Generate
          </Button>
          <Button className="rounded-full px-6 py-6" asChild disabled={loading}>
            <a href={image} download="image.jpg">
              Download
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
