import { MdOutlineMailOutline } from "react-icons/md";

const EmailInput = ({ setUser, user }) => {
  return (
    <label
      htmlFor="email"
      className="border flex gap-2 border-slate-300 rounded-lg items-center mt-10 pl-6 pr-24 py-3"
    >
      <MdOutlineMailOutline className="text-gray-500 text-[1.7rem]" />
      <div className="flex flex-col border-l-2 border-[#d3d3d3] pl-2">
        <span className="text-[13px] font-semibold">E-mail*</span>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter your e-mail"
          required
          className="placeholder:text-gray-400 placeholder:text-[14.5px] text-[14.5px] outline-none"
        />
      </div>
    </label>
  );
};

export default EmailInput;
