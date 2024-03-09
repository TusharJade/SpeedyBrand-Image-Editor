import Image from "next/image";
import SpeedyBrand from "../../public/assets/speedybrand.svg";
import Link from "next/link";
import { useAuthContext } from "@/store/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { auth, setAuth } = useAuthContext();
  const router = useRouter();
  return (
    <nav className="border-b-[1.5px] h-[4rem] w-full flex justify-between bg-white shadow-sm fixed top-0 z-50">
      <div className="flex h-full items-center gap-6 ml-6">
        <Link href="/">
          <Image src={SpeedyBrand} className="cursor-pointer" alt="logo" />
        </Link>
        <div className="font-medium cursor-pointer">Image Editor</div>
      </div>
      <div className="flex items-center justify-center mr-5 gap-4">
        {auth.isLogin ? (
          <div
            className="font-medium text-white bg-[#fe5829] py-[0.3125rem] px-3 rounded-md text-[14.5px] cursor-pointer"
            onClick={() => {
              localStorage.removeItem("USER");
              toast.success("Logout successfully");
              setAuth({ isLogin: false });
              router.push("/login");
            }}
          >
            Logout
          </div>
        ) : (
          <>
            <Link className="text-[14.5px] font-semibold" href="/login">
              Login
            </Link>
            <Link
              className="font-medium text-white bg-[#fe5829] py-[0.3125rem] px-3 rounded-md text-[14.5px]"
              href="/singup"
            >
              Sign up
            </Link>
          </>
        )}
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
