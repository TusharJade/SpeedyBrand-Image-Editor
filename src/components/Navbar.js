import Image from "next/image";
import SpeedyBrand from "../../public/assets/SpeedyBrand.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b-[1.5px] h-[4rem] flex justify-between bg-white shadow-sm">
      <div className="flex h-full items-center gap-6 ml-6">
        <Image src={SpeedyBrand} className="cursor-pointer" alt="logo" />
        <div className="font-medium cursor-pointer">Image Editor</div>
      </div>
      <div className="flex items-center justify-center mr-5 gap-4">
        <Link className="text-[14.5px] font-semibold" href="/login">
          Login
        </Link>
        <Link
          className="font-medium text-white bg-[#fe5829] py-[0.3125rem] px-3 rounded-md text-[14.5px]"
          href="/singup"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <div className="bg-[#fe5829] w-12 h-12 rounded-full flex items-center justify-center text-[1.9rem] pt-[2px] text-white cursor-pointer">
          T
        </div> */
}
