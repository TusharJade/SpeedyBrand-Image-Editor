import { useRef } from "react";
import { Button } from "./ui/button";
import { useAuthContext } from "@/store/AuthContext";
import { toast } from "react-toastify";

const LandingPage = ({ setImage }) => {
  const { auth } = useAuthContext();
  const fileInputRef = useRef(null);
  return (
    <section className="text-center pt-[6rem] sm:pt-[5.5rem]">
      <div className="font-semibold text-[2rem] sm:text-[2.625rem]">
        Photo editor
      </div>
      <p className="text-[1.21rem] text-[#47474f] mb-5 sm:mb-8 mx-4 sm:text-[1.375rem] sm:mx-6">
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
      <div
        onClick={() => {
          if (auth.isLogin) {
            fileInputRef.current.click();
          } else {
            toast.warn("Please login to edit photo");
          }
        }}
      >
        <Button variant="default">Select Image</Button>
      </div>
    </section>
  );
};

export default LandingPage;
