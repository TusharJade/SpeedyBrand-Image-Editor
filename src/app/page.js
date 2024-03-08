"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const FileInputRef = useRef(null);
  return (
    <div className="h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="text-center">
        <div className="font-semibold text-[2.625rem] mt-7">Photo editor</div>
        <p className="text-[1.375rem] text-[#47474f] mb-8">
          Add text, stickers, effects and filters to your photos. Edit your
          photos online.
        </p>
        <input
          ref={FileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
        />
        <div onClick={() => FileInputRef.current.click()}>
          <Button variant="default">Select Image</Button>
        </div>
      </section>
    </div>
  );
}
