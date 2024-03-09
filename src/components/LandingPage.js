import { useRef } from "react";
import { Button } from "./ui/button";

const LandingPage = ({ setImage }) => {
  const fileInputRef = useRef(null);
  return (
    <section className="text-center pt-[5.5rem]">
      <div className="font-semibold text-[2.625rem]">Photo editor</div>
      <p className="text-[1.375rem] text-[#47474f] mb-8">
        Add text, stickers, effects and filters to your photos. Edit your photos
        online.
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
  );
};

export default LandingPage;