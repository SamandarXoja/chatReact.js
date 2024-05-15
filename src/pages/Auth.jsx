import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  // http://localhost:5555/auth/register

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://chat-ubzo.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(data);
    navigate("/home");
    reset();
  };

  return (
    <div className="bg-[#1A3560] h-dvh flex justify-center items-center">
      <div className="bg-white max-w-[500px] w-full mx-auto py-[56px]  px-[40px]">
        <h3 className="text-[23px] font-semibold text-center mb-3">Sign up</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="w-full max-w-[420px] h-[48px] rounded-[8px] outline-none py-[6px] px-4 border border-gray-300"
            placeholder="fullName"
            type="text"
            {...register("fullName", { required: true })}
          />
          <input
            className="w-full max-w-[420px] h-[48px] rounded-[8px] outline-none py-[6px] px-4 border border-gray-300"
            placeholder="email"
            type="email"
            {...register("email", { required: true })}
          />
          <input
            className="w-full max-w-[420px] h-[48px] rounded-[8px] outline-none py-[6px] px-4 border border-gray-300"
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="max-w-[420px] w-full rounded-[1000px] bg-[#40B3E7] py-[12px] text-[#fff] text-lg"
          >
            Submit
          </button>
        </form>
        <div className="mt-[25px] text-center">
          <Link to="/">Do you have Account ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
