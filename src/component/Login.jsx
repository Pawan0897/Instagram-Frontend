import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#49111c]">Socially.</h1>

          <p className="text-gray-500 mt-3 text-sm">
            Welcome back! Login to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8e3545] focus:ring-4 focus:ring-[#8e3545]/10 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 outline-none focus:border-[#8e3545] focus:ring-4 focus:ring-[#8e3545]/10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="text-right">
            {/* <Link
              to="/forgot-password"
              className="text-sm text-[#8e3545] hover:underline"
            >
              Forgot password?
            </Link> */}
          </div>

          <button
            type="submit"
            className="w-full bg-[#49111c] hover:bg-[#641c2b] text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?
          {/* <Link
            to="/signup"
            className="text-[#8e3545] font-semibold ml-1 hover:underline"
          >
            Sign up
          </Link> */}
        </p>
      </div>
    </div>
  );
}

export default Login;
