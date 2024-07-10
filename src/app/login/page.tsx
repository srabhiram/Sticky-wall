"use client"

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [userData, setuserData] = useState({ email: "", password: "" });

  const handleChange = (e:any) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(userData);
    if (!userData.email || userData.password) {
      setError({
        emailError: "All fields are required",
        passwordError: "All fields are required",
      });
    }
    // vaidation using regex pattern
    if (!userData.email.includes("@")) {
      setError((prevState) => ({
        ...prevState,
        emailError: "Invalid email address",
      }));
      return;
    }

    // password validation with min8 characters required
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      setError(() => ({
        emailError: "",
        passwordError:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
      return;
    }
    setError({
      emailError: "",
      passwordError: "",
    });
    setLoading(!loading);

    // send data to server
    try {
      const res = await axios.post("/api/login", userData);
      console.log(res);
      setuserData({
        email: "",
        password: "",
      });
      router.push("/home");
      setLoading(!loading);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-lime-50 overflow-hidden w-full">
        <h1 className="text-xl md:text-[2rem] py-2 font-semibold font-playwrite">
          Login
        </h1>
        <hr />
        <form className="flex flex-col gap-3 mt-3 md:w-[20%]">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white px-3 py-3 rounded-md outline-none"
            value={userData.email}
            onChange={handleChange}
          />
          {error.emailError && (
            <p className="text-red-500">{error.emailError}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-white px-3 py-3 rounded-md outline-none"
            value={userData.password}
            onChange={handleChange}
          />
          {error.passwordError && (
            <p className="text-red-500 tracking-tight">{error.passwordError}</p>
          )}
          <button
            disabled={loading}
            className="px-3 py-2 bg-lime-400 mt-1 text-center rounded-md font-semibold cursor-pointer hover:bg-lime-500 transition-all duration-150 active:bg-lime-300 disabled:cursor-not-allowed disabled:bg-lime-200"
            onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Login<span className="loader"></span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-2 md:text-lg font">
          Don&apos;t have an account?{" "}
          <Link href={`/signup`} className="text-lime-500">
            Signup
          </Link>{" "}
          here
        </p>
      </div>
    </>
  );
}
