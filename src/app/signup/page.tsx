"use client";

import axios from "axios";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserData {
  fullname: string;
  email: string;
  password: string;
}

interface ErrorData {
  emailError: string;
  passwordError: string;
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorData>({
    emailError: "",
    passwordError: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const { email, password } = userData;
    let valid = true;

    if (!email.includes("@")) {
      setError((prevState) => ({ ...prevState, emailError: "Invalid email address" }));
      valid = false;
    } else {
      setError((prevState) => ({ ...prevState, emailError: "" }));
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError((prevState) => ({
        ...prevState,
        passwordError:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
      valid = false;
    } else {
      setError((prevState) => ({ ...prevState, passwordError: "" }));
    }

    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email || !userData.fullname || !userData.password) {
      setError({
        emailError: "All fields are required",
        passwordError: "All fields are required",
      });
      return;
    }

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        axios.post("/api/signup", userData),
        {
          loading: "Processing....",
          success: "Successfully signed up, Login now",
          error: "",
        }
      );

      setUserData({
        fullname: "",
        email: "",
        password: "",
      });

      router.push("/login");
    } catch (error: any) {
      if (error.response.status ===400) {
        toast.error("User Already Registered");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lime-50 overflow-hidden w-full">
      <h1 className="text-xl md:text-[2rem] py-2 font-semibold font-playwrite">Signup</h1>
      <hr />
      <form className="flex flex-col gap-3 mt-3 md:w-[20%]" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          className="bg-white px-3 py-3 rounded-md outline-none"
          value={userData.fullname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-white px-3 py-3 rounded-md outline-none"
          value={userData.email}
          onChange={handleChange}
        />
        {error.emailError && <p className="text-red-500">{error.emailError}</p>}

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
          type="submit"
          disabled={loading}
          className="px-3 py-2 bg-lime-400 mt-1 text-center rounded-md font-semibold cursor-pointer hover:bg-lime-500 transition-all duration-150 active:bg-lime-300 disabled:cursor-not-allowed disabled:bg-lime-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              Signup<span className="loader"></span>
            </span>
          ) : (
            "Signup"
          )}
        </button>
      </form>

      <p className="mt-2 md:text-lg font">
        Already have an account?{" "}
        <Link href="/login" className="text-lime-500">
          Login
        </Link>{" "}
        here
      </p>
    </div>
  );
}
