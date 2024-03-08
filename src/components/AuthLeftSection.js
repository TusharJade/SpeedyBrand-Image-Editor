import { FaStar } from "react-icons/fa6";
import AvatarComponent from "./AvatarComponent";

const AuthLeftSection = () => {
  return (
    <section className="w-[50%] bg-[#fffaf3] h-screen">
      <div className="flex flex-col items-center justify-center h-full font-sans">
        <div className="flex gap-[6px]">
          {new Array(5).fill(0).map((i) => (
            <FaStar className="text-yellow-400 text-[1.25rem]" />
          ))}
        </div>
        <p className="text-[2rem] mb-4 max-w-[32rem] font-semibold mt-1.5">
          Speedy has saved us thousands of hours of work. We're able to spin up
          promotional content much faster.
        </p>
        <AvatarComponent />
        <div className="font-bold mt-2 text-[1.1rem]">Scott</div>
        <div className="font-medium text-[#444638]">
          CEO, Glory Cloud Coffee Roasters
        </div>
      </div>
    </section>
  );
};

export default AuthLeftSection;
