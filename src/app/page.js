"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function Home() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  return (
    <div className="h-screen bg-[#f9f9f9]">
      <ToastContainer />
      <Navbar />
      {!image && (
        <section className="text-center pt-[5.5rem]">
          <div className="font-semibold text-[2.625rem]">Photo editor</div>
          <p className="text-[1.375rem] text-[#47474f] mb-8">
            Add text, stickers, effects and filters to your photos. Edit your
            photos online.
          </p>
          <input
            ref={fileInputRef}
            onChange={(event) => {
              const ImageFile = event.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(ImageFile);
            }}
            type="file"
            className="hidden"
            accept="image/*"
          />
          <div onClick={() => fileInputRef.current.click()}>
            <Button variant="default">Select Image</Button>
          </div>
        </section>
      )}

      {image && (
        <div className="w-full flex h-screen bg-[#f9f9f9]">
          <section className="flex justify-center items-center w-[72%] mt-[4rem] relative">
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <div className="tools">
                    <button
                      onClick={() => zoomIn()}
                      className="top-1 left-2 absolute text-[1.4rem] text-gray-400"
                    >
                      <AiFillPlusCircle />
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="top-1 left-9 absolute text-[1.4rem] text-gray-400"
                    >
                      <AiFillMinusCircle />
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="top-1 right-1 absolute text-[1.3rem] text-gray-400"
                    >
                      <GrPowerReset />
                    </button>
                  </div>
                  <TransformComponent>
                    <TransformWrapper initialScale={1}>
                      <TransformComponent>
                        <img
                          src={image}
                          alt="Uploaded"
                          className="max-w-[30rem] max-h-[30rem] object-contain"
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </section>
          <section className="w-[28%] mt-[4rem] bg-white shadow-md">
            <div className="flex justify-center items-center w-full">
              <Button variant="destructive" size="sm">
                <MdDownload className="mt-[1px] mr-1" />
                Save
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
