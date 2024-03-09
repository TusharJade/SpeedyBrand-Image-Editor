"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import LandingPage from "@/components/LandingPage";
import { effects } from "@/lib/utils";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [image, setImage] = useState(null);
  const [appliedEffects, setAppliedEffects] = useState([]);
  const [text, setText] = useState([]); // State for text input
  const [draggingIndex, setDraggingIndex] = useState(null); // Define draggingIndex state variable
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // State to track offset during dragging
  const [dropDown, setDropDown] = useState({ effects: false, text: false });
  const canvasRef = useRef(null);

  // when image or text is added
  useEffect(() => {
    drawContent();
  }, [image, text, appliedEffects]);

  // when text is added
  const addText = () => {
    const newTextInput = {
      text: "",
      fontSize: 16,
      color: "#000000",
      position: { x: 50, y: 50 },
    };
    setText([...text, newTextInput]);
  };

  // when text updated
  const updateText = (index, field, value) => {
    const updatedTexts = [...text];
    updatedTexts[index][field] = value;
    setText(updatedTexts);
  };

  //when text removed
  const removeText = (index) => {
    const updatedTexts = [...text];
    updatedTexts.splice(index, 1);
    setText(updatedTexts);
  };

  //for checkboxes
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

  // to draw content or add effects on canvas
  const drawContent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Redraw image
    if (image) {
      const img = new Image();
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Draw image on canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Apply effects
        appliedEffects.forEach((effect) => {
          effects[effect](ctx, drawWidth, drawHeight, offsetX, offsetY);
        });

        // Draw text
        text.length > 0 &&
          text.forEach((textItem) => {
            const { text, fontSize, color, position } = textItem;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = color;
            ctx.fillText(text, position.x, position.y);
          });
      };
      img.src = image;
    }
  };

  // to reset effects
  const resetEffects = () => {
    setAppliedEffects([]);
  };

  // to downlode image
  const downloadImage = () => {
    const canvas = document.getElementById("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "modified_image.png";
    link.href = url;
    link.click();
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const handleMouseMove = (event) => {
    if (draggingIndex !== null) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      updateText(draggingIndex, "position", {
        x: offsetX - dragOffset.x,
        y: offsetY - dragOffset.y,
      });
    }
  };

  const handleMouseDown = (event, index) => {
    setDraggingIndex(index);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setDragOffset({
      x: offsetX - text[index].position.x,
      y: offsetY - text[index].position.y,
    });
  };

  return (
    <div
      className="h-screen bg-[#f9f9f9]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ToastContainer />
      <Navbar />
      {!image && <LandingPage setImage={setImage} />}

      {image && (
        <div className="w-full flex h-screen bg-[#f9f9f9]">
          {/* // image section */}
          <section className="flex justify-center items-center w-[72%] mt-[4rem] relative">
            <canvas
              id="canvas"
              ref={canvasRef}
              width="500"
              height="500"
            ></canvas>
          </section>

          {/* effects and text section */}
          <section className="w-[28%] mt-[4rem] bg-white shadow-md overflow-auto flex justify-between flex-col">
            <div>
              <div
                className="w-full flex items-center justify-center font-sans font-medium cursor-pointer text-[1.1rem] bg-white text-[#454545] py-5"
                onClick={() =>
                  setDropDown((prev) => ({ ...prev, effects: !prev.effects }))
                }
              >
                <span className="mr-2 text-[1.25rem] mt-[1px]">
                  <IoMdArrowDropdown />
                </span>
                Effets for Image
              </div>

              <div className="bg-slate-300 h-[1px]"></div>

              {dropDown.effects && (
                <>
                  <div className="ml-4 mt-3">
                    {[
                      "Grayscale",
                      "Invert",
                      "Sepia",
                      "Brightness",
                      "Contrast",
                      "Vintage",
                    ].map((effectName) => {
                      return (
                        <label className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            value={effectName.toLowerCase()}
                            checked={
                              appliedEffects.includes(effectName.toLowerCase())
                                ? true
                                : false
                            }
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-blue-600 rounded mr-[5px] cursor-pointer"
                          />
                          <span className="text-gray-800 mt-[2.5px] cursor-pointer">
                            {effectName}
                          </span>
                        </label>
                      );
                    })}
                    <div className="flex justify-center mb-4 w-full">
                      <button
                        onClick={resetEffects}
                        className="text-[#fe5829] border-[1px] border-[#fe5829] px-3 py-1 rounded-md"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-300 h-[1px]"></div>
                </>
              )}

              {/* Add text */}
              <div
                className="w-full flex items-center justify-center font-sans font-medium text-[1.1rem] bg-white text-[#454545] py-5 cursor-pointer"
                onClick={() =>
                  setDropDown((prev) => ({ ...prev, text: !prev.text }))
                }
              >
                <span className="mr-2 text-[1.25rem] mt-[1px]">
                  <IoMdArrowDropdown />
                </span>
                Add Text
              </div>

              <div className="bg-slate-300 h-[1px]"></div>

              {dropDown.text && (
                <div>
                  {text.length > 0 &&
                    text.map((textItem, index) => (
                      <div key={index}>
                        <label
                          htmlFor="text"
                          className="flex items-center mx-4 mt-4"
                        >
                          <span className="mr-2 text-[#616161]">Text:</span>
                          <input
                            type="text"
                            id="text"
                            value={textItem.text}
                            onChange={(e) =>
                              updateText(index, "text", e.target.value)
                            }
                            placeholder="Enter text"
                            className="px-2 py-2 w-full border outline-none ml-[31px] border-slate-300 rounded-lg placeholder:text-slate-400"
                          />
                        </label>
                        <label
                          htmlFor="number"
                          className="flex items-center mx-4 mt-4"
                        >
                          <span className="mr-2 text-[#616161]">Fontsize:</span>
                          <input
                            type="number"
                            value={textItem.fontSize}
                            onChange={(e) =>
                              updateText(
                                index,
                                "fontSize",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="Font size"
                            className="px-2 py-2 border w-full outline-none border-slate-300 rounded-lg placeholder:text-slate-400"
                          />
                        </label>
                        <label
                          htmlFor="color"
                          className="flex items-center mx-4 mt-4"
                        >
                          <span className="text-[#616161] mr-8">Color:</span>
                          <input
                            type="color"
                            id="color"
                            value={textItem.color}
                            onChange={(e) =>
                              updateText(index, "color", e.target.value)
                            }
                            placeholder="Text color"
                          />
                        </label>
                        <div className="flex items-center justify-around mx-4">
                          <button
                            onClick={() => removeText(index)}
                            className="border border-[#fe5829] text-[#fe5829] flex items-center justify-center py-1.5 px-2.5 gap-1 rounded text-[14px] font-sans"
                          >
                            <MdDelete className="mb-[1px]" />
                            <span> Delete</span>
                          </button>
                          <div
                            onMouseDown={(event) =>
                              handleMouseDown(event, index)
                            }
                            className="cursor-move bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 flex items-center justify-center"
                            style={{ width: "80px", height: "80px" }}
                          >
                            <div className="w-2.5 h-5 bg-white rounded-full mr-2"></div>
                            <div className="text-sm">Drag me</div>
                          </div>
                        </div>
                        <div className="bg-slate-300 h-[1px] mx-4 mt-3"></div>
                      </div>
                    ))}

                  <div className="flex items-center justify-center">
                    <button
                      onClick={addText}
                      className="border-[1px] py-2 px-4 rounded-md mt-4 text-[#fe5829] border-[#fe5829] font-medium"
                    >
                      Click to add new text
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Download edited image */}
            <div className="flex justify-center items-center w-full mb-3 mt-4">
              <Button variant="destructive" size="sm" onClick={downloadImage}>
                <MdDownload className="mt-[1px] mr-1" />
                Download
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
