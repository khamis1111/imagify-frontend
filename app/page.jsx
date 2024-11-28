"use client";

import { assets, stepsData, testimonialsData } from "@/assets/assets";
import { SectionTitle } from "@/components/home/SectionTitle";
import { Card } from "@/components/layout/Card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, setOpenLogin } = useContext(AppContext);

  const isLoggedResult = () => {
    if (!user) {
      setOpenLogin(true);
    } else {
      router.push("/result");
    }
  };

  return (
    <div className="container space-y-32">
      {/* Main */}
      <div className="text-center flex flex-col items-center justify-center gap-y-8 max-w-[50rem] mx-auto">
        <div className="py-2 px-10 w-max bg-white border rounded-full border-borderGray text-base font-normal flex items-center gap-x-2">
          Best text to image generator
          <div className="relative w-3 h-3">
            <Image
              src={assets.star_icon}
              alt="STAR"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0.2, y: 50 }}
          transition={{ duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-7xl font-normal"
        >
          Turn text to <br /> <span className="text-mainColor">image</span>, in
          seconds.
        </motion.p>

        <p className="text-lg font-normal text-textGray">
          Unleash your creativity with AI. Turn your imagination into visual art
          in seconds – just type, and watch the magic happen.
        </p>

        <Button
          className="rounded-full px-12 py-7 font-normal text-base"
          onClick={isLoggedResult}
        >
          Generate Images
          <div className="relative w-7 h-7">
            <Image
              src={assets.star_group}
              alt="STARS"
              fill
              className="object-contain"
            />
          </div>
        </Button>

        <div className="space-y-2 mt-10">
          <div className="flex items-center flex-wrap justify-center gap-4">
            <div className="relative w-20 h-20 drop-shadow-md">
              <Image
                src={assets.sample_img_1}
                alt="AI-1"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="relative w-20 h-20 drop-shadow-md">
              <Image
                src={assets.sample_img_2}
                alt="AI-2"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="relative w-20 h-20 drop-shadow-md">
              <Image
                src={assets.sample_img_1}
                alt="AI-1"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="relative w-20 h-20 drop-shadow-md">
              <Image
                src={assets.sample_img_2}
                alt="AI-2"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
          <p className="text-base font-normal text-textGray">
            Generated images from imagify
          </p>
        </div>
      </div>
      {/* How it works */}
      <motion.div
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center flex flex-col items-center justify-center gap-y-5 max-w-[50rem] mx-auto"
      >
        <SectionTitle
          title={"How it works"}
          description={"Transform Words Into Stunning Images"}
        />

        {stepsData.map((data, index) => (
          <Card
            key={index}
            className="flex items-start md:items-center gap-x-4 w-full"
          >
            <div className="relative min-w-11 min-h-11">
              <Image
                src={data.icon}
                alt={data.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-start">
              <p className="text-xl font-medium">{data.title}</p>
              <p className="font-normal text-base text-textGray">
                {data.description}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>
      {/* Create AI Images */}
      <div className="text-center space-y-10 max-w-[70rem] mx-auto">
        <SectionTitle
          title={"Create AI Images"}
          description={"Turn your imagination into visuals"}
        />

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Section */}
          <div className="relative col-span-12 md:col-span-5">
            <div className="w-[200px] h-[200px] md:w-[393px] md:h-[393px]">
              <Image
                src={assets.sample_img_1}
                alt="STAR"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-4 text-start col-span-12 md:col-span-7 p-4 md:p-10">
            <p className="font-medium text-2xl md:text-3xl">
              Introducing the AI-Powered Text to Image Generator
            </p>
            <p className="text-textGray text-sm md:text-base font-normal">
              Easily bring your ideas to life with our free AI image generator.
              Whether you need stunning visuals or unique imagery, our tool
              transforms your text into eye-catching images with just a few
              clicks. Imagine it, describe it, and watch it come to life
              instantly.
            </p>
            <p className="text-textGray text-sm md:text-base font-normal">
              Easily bring your ideas to life with our free AI image generator.
              Whether you need stunning visuals or unique imagery, our tool
              transforms your text into eye-catching images with just a few
              clicks. Imagine it, describe it, and watch it come to life
              instantly.
            </p>
          </div>
        </div>
      </div>
      {/* Customer testimonials */}
      <div className="text-center space-y-10 max-w-[70rem] mx-auto">
        <SectionTitle
          title={"Customer testimonials"}
          description={"What Our Users Are Saying"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonialsData.map((data, index) => (
            <Card
              key={index}
              className={
                "flex flex-col items-center justify-center gap-y-4 w-fit"
              }
            >
              <div className="relative w-10 h-10">
                <Image
                  src={data.image}
                  alt="STAR"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="">
                <p className="font-medium text-lg">{data.name}</p>
                <p className="font-medium text-sm">{data.role}</p>
              </div>
              <div className="flex items-center gap-x-[1px]">
                {Array(data.stars)
                  .fill()
                  .map((_, i) => (
                    <div className="relative w-5 h-5" key={i}>
                      <Image
                        src={assets.rating_star}
                        alt="STARS"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
              </div>

              <p className="text-base font-normal text-textGray">{data.text}</p>
            </Card>
          ))}
        </div>
      </div>
      {/* See the magic */}
      <div className="text-center space-y-10">
        <p className="font-medium text-3xl md:text-4xl">
          See the magic. Try now
        </p>

        <Button
          className="rounded-full px-12 py-7 font-normal text-base"
          onClick={isLoggedResult}
        >
          Generate Images
          <div className="relative w-7 h-7">
            <Image
              src={assets.star_group}
              alt="STARS"
              fill
              className="object-contain"
            />
          </div>
        </Button>
      </div>
      {/* Footer */}
      <div className="py-5 flex items-center justify-center md:justify-between flex-wrap gap-4">
        <div className="flex items-center gap-x-4 md:gap-x-8">
          <div className="relative w-32 h-10">
            <Link href={"/"}>
              <Image
                src={assets.logo}
                alt="LOGO"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          <div className="h-7 w-px bg-textGray"></div>

          <p className="text-textGray font-normal text-base text-wrap w-fit">
            All right reserved. Copyright @imagify
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9">
            <Link href={"/"}>
              <Image
                src={assets.facebook_icon}
                alt="SOCAIL1"
                fill
                className="object-contain"
              />
            </Link>
          </div>
          <div className="relative w-9 h-9">
            <Link href={"/"}>
              <Image
                src={assets.twitter_icon}
                alt="SOCAIL2"
                fill
                className="object-contain"
              />
            </Link>
          </div>
          <div className="relative w-9 h-9">
            <Link href={"/"}>
              <Image
                src={assets.instagram_icon}
                alt="SOCAIL3"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
