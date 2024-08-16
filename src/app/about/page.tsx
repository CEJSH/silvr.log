import AboutMe from "@/components/AboutMe";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About me",
  description: "eunjae career introduction",
};

export default function AboutPage() {
  return (
    <div className={aboutPageStyle}>
      <AboutMe />
    </div>
  );
}

const aboutPageStyle = "w-full flex justify-center";
