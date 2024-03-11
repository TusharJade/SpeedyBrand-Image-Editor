import { FaStar } from "react-icons/fa6";
import AvatarComponent from "./AvatarComponent";

const AuthLeftSection = () => {
  return (
    <section className="w-[50%] bg-[#fffaf3] h-screen md:block hidden">
      <div className="flex flex-col items-center justify-center h-full font-sans">
        <div className="flex gap-[6px]">
          {new Array(5).fill(0).map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-[1.25rem]" />
          ))}
        </div>
        <p className="text-[1.8rem] mb-4 mx-10  lg:max-w-[32rem] font-semibold lg:mx-0 mt-1.5 lg:text-[2rem]">
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
