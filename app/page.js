"use client";
import RightPane from "@/components/RightPane";
import SettingsPane from "@/components/SettingsPane";
import Title from "@/components/Title";
import WebXRVeiwer from "@/components/WebXRVeiwer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <WebXRVeiwer />
      <SettingsPane/>
      <RightPane/>
      <Title/>
    </div>
  );
}
