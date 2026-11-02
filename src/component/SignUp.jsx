import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match");
      return;
    }

    console.log(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-[#49111c]">Socially.</h1>

          <p className="text-gray-500 mt-3 text-sm">
            Create your account and join us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8e3545] focus:ring-4 focus:ring-[#8e3545]/10 transition"
            />
          </div>

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
                placeholder="Create password"
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

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8e3545] focus:ring-4 focus:ring-[#8e3545]/10 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#49111c] hover:bg-[#641c2b] text-white py-3 rounded-xl font-semibold transition duration-300 mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="text-[#8e3545] font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
