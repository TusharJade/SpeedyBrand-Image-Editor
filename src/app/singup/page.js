"use client";

import { FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import AuthLeftSection from "@/components/AuthLeftSection";
import PasswordInput from "@/components/PasswordInput";
import EmailInput from "@/components/EmailInput";
import { useAuthContext } from "@/store/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { setSignUpData } = useAuthContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password.length > 5) {
      setSignUpData((prevData) => [...prevData, user]);
      toast.success("Sign up successfully, please login now");
      router.push("/login");
    } else {
      toast.error("Password should be greater than 5 character");
    }
  };
  return (
    <div className="w-full h-screen flex">
      <AuthLeftSection />
      <section className="w-[50%] h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full font-sans"
        >
          <div className="font-semibold text-[1.5rem]">Sign Up</div>
          <div className="text-[#667085] mt-1">To create amazing content!</div>

          <button class="px-20 py-3 border flex gap-2 border-slate-300 rounded-lg items-center mt-6">
            <div>
              <Image
                width={20}
                height={20}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
            </div>
            <span className="text-gray-700 font-semibold text-[15px]">
              Continue With Google
            </span>
          </button>

          <div className="relative mt-3 flex justify-center">
            <div className="w-[20rem] h-[1px] bg-gray-300 absolute top-3"></div>
            <div className="text-xs px-3 font-inter rounded-md bg-white text-gray-400 p-1 absolute top-0">
              OR
            </div>
          </div>

          <EmailInput setUser={setUser} user={user} />

          <PasswordInput setUser={setUser} user={user} />

          <button
            className="text-white bg-[#fe5829] text-[1.1rem] mt-6 flex items-center justify-center px-[1.625rem] pt-4 pb-[17px] gap-2 rounded-full"
            type="submit"
          >
            <span>Sign Up</span>
            <FaCircleChevronRight className="mt-[3px]" />
          </button>

          <div className="mt-4 text-[1rem]">
            Already have an account?
            <Link className="text-[#fe5829]" href="/login">
              {" "}
              Login.
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
