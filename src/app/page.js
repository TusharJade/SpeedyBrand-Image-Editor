"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import LandingPage from "@/components/LandingPage";
import { effects } from "@/lib/utils";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [appliedEffects, setAppliedEffects] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;
        const canvasAspectRatio = canvas.width / canvas.height;
        const imageAspectRatio = naturalWidth / naturalHeight;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imageAspectRatio > canvasAspectRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imageAspectRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imageAspectRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        // Set image smoothing quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image on canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        setImageLoaded(true);
      };

      img.src = image;
    }
  }, [image, canvasRef.current]);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    let updatedEffects = [...appliedEffects];
    if (checked) {
      updatedEffects.push(value);
    } else {
      updatedEffects = updatedEffects.filter((effect) => effect !== value);
    }
    setAppliedEffects(updatedEffects);
  };

  const applyEffects = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      const canvasAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = naturalWidth / naturalHeight;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageAspectRatio > canvasAspectRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageAspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imageAspectRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Set image smoothing quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image on canvas
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      appliedEffects.forEach((effect) => {
        effects[effect](ctx, drawWidth, drawHeight, offsetX, offsetY);
      });
    };
    img.src = image;
  };

  const resetEffects = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw original image without any effects
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      const canvasAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = naturalWidth / naturalHeight;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageAspectRatio > canvasAspectRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageAspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imageAspectRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Set image smoothing quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image on canvas
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    img.src = image;

    // Clear applied effects array
    setAppliedEffects([]);
  };

  const downloadImage = () => {
    const canvas = document.getElementById("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "modified_image.png";
    link.href = url;
    link.click();
  };

  return (
    <div className="h-screen bg-[#f9f9f9]">
      <ToastContainer />
      <Navbar />
      {!image && <LandingPage setImage={setImage} />}

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
                        <canvas
                          id="canvas"
                          ref={canvasRef}
                          width="500"
                          height="500"
                        ></canvas>
                      </TransformComponent>
                    </TransformWrapper>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </section>

          <section className="w-[28%] mt-[4rem] bg-white shadow-md">
            <div>
              {imageLoaded && (
                <div>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="grayscale"
                      checked={appliedEffects.includes("grayscale")}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]">Grayscale</span>
                  </label>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="invert"
                      checked={appliedEffects.includes("invert") ? true : false}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]">Invert</span>
                    Colors
                  </label>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="sepia"
                      checked={appliedEffects.includes("sepia") ? true : false}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]"> Sepia</span>
                  </label>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="brightness"
                      checked={
                        appliedEffects.includes("brightness") ? true : false
                      }
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]">
                      {" "}
                      Brightness
                    </span>
                  </label>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="contrast"
                      checked={
                        appliedEffects.includes("contrast") ? true : false
                      }
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]">Contrast</span>
                  </label>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value="vintage"
                      checked={
                        appliedEffects.includes("vintage") ? true : false
                      }
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                    />
                    <span className="text-gray-800 mt-[2.5px]">Vintage</span>
                  </label>
                  <div className="mx-4 flex justify-between mb-4">
                    <button
                      onClick={applyEffects}
                      className="text-[#fe5829] border-[1px] border-[#fe5829] px-3 py-1 rounded-md"
                    >
                      Apply Effects
                    </button>
                    <button
                      onClick={resetEffects}
                      className="text-[#fe5829] border-[1px] border-[#fe5829] px-3 py-1 rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center w-full">
              <Button variant="destructive" size="sm" onClick={downloadImage}>
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
