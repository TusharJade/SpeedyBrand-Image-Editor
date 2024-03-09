"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import LandingPage from "@/components/LandingPage";
import { effects } from "@/lib/utils";

export default function Home() {
  const [image, setImage] = useState(null);
  const [appliedEffects, setAppliedEffects] = useState([]);
  const [text, setText] = useState([]); // State for text input
  const [draggingIndex, setDraggingIndex] = useState(null); // Define draggingIndex state variable
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // State to track offset during dragging
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
          <section className="flex justify-center items-center w-[72%] mt-[4rem] relative">
            <canvas
              id="canvas"
              ref={canvasRef}
              width="500"
              height="500"
            ></canvas>
          </section>

          <section className="w-[28%] mt-[4rem] bg-white shadow-md">
            <div>
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
                  <span className="text-gray-800 mt-[2.5px]"> Brightness</span>
                </label>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value="contrast"
                    checked={appliedEffects.includes("contrast") ? true : false}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                  />
                  <span className="text-gray-800 mt-[2.5px]">Contrast</span>
                </label>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value="vintage"
                    checked={appliedEffects.includes("vintage") ? true : false}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 rounded mr-[5px]"
                  />
                  <span className="text-gray-800 mt-[2.5px]">Vintage</span>
                </label>
                <div className="mx-4 flex justify-between mb-4">
                  <button
                    onClick={resetEffects}
                    className="text-[#fe5829] border-[1px] border-[#fe5829] px-3 py-1 rounded-md"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button onClick={addText}>Add Text</button>
              {text.length > 0 &&
                text.map((textItem, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={textItem.text}
                      onChange={(e) =>
                        updateText(index, "text", e.target.value)
                      }
                      placeholder="Enter text"
                    />
                    <input
                      type="number"
                      value={textItem.fontSize}
                      onChange={(e) =>
                        updateText(index, "fontSize", parseInt(e.target.value))
                      }
                      placeholder="Font size"
                    />
                    <input
                      type="color"
                      value={textItem.color}
                      onChange={(e) =>
                        updateText(index, "color", e.target.value)
                      }
                      placeholder="Text color"
                    />
                    <button onClick={() => removeText(index)}>Remove</button>
                    <div
                      onMouseDown={(event) => handleMouseDown(event, index)}
                      style={{ cursor: "move" }}
                    >
                      Drag me
                    </div>
                  </div>
                ))}
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
