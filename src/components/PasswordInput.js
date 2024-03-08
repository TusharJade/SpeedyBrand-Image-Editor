import { FiKey } from "react-icons/fi";

const PasswordInput = () => {
  return (
    <label
      htmlFor="password"
      className="border flex gap-2 border-slate-300 rounded-lg items-center mt-4 pl-6 pr-24 py-3"
    >
      <FiKey className="text-gray-500 text-[1.7rem]" />
      <div className="flex flex-col border-l-2 border-[#d3d3d3] pl-2">
        <span className="text-[13px] font-semibold">Password*</span>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="placeholder:text-gray-400 placeholder:text-[14.5px] text-[14.5px] outline-none"
        />
      </div>
    </label>
  );
};

export default PasswordInput;
