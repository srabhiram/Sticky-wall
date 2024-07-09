"use client"

import Link from "next/link";

export default function Signup() {
  const onLogin = (e: { preventDefault: () => void; }) => {
e.preventDefault();
    try {
      fetch("/api/login",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((dat) => dat.json())
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
       <div className="min-h-screen flex flex-col items-center justify-center bg-lime-50 overflow-hidden w-full">
        <h1 className="text-xl md:text-[2rem] py-2 font-semibold font-playwrite">Signup</h1>
      <hr />
        <form className="flex flex-col gap-3 mt-3 md:w-[20%]">
          <input type="text" placeholder="Full Name" className="bg-white px-3 py-3 rounded-md outline-none"/>
          <input type="email" placeholder="Email" className="bg-white px-3 py-3 rounded-md outline-none"/>
          <input type="password" placeholder="Password" className="bg-white px-3 py-3 rounded-md outline-none"/>
          <input type="submit" value="Signup" className="px-3 py-2 bg-lime-400 mt-1 rounded-md font-semibold cursor-pointer" />
        </form>
        <p className="mt-2 md:text-lg font">Already have an account? <Link href={`/login`} className="text-lime-500">Login</Link> here</p>

      </div>
    </>
  );
}
