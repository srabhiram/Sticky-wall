import Link from "next/link";

export default function Home() {
  return (
   <>
   <main className="min-h-screen w-full flex flex-col items-center justify-center bg-lime-50">
    <h1 className="text-[3rem] md:text-[8rem] font-bold font-playwrite">Sticky Wall</h1>
    <p className="text-[1rem] md:text-[2rem] font-semibold font-playwrite">A To-Do List for your Daily life!</p>
    <Link href={`/signup`} className="mt-3 px-3 py-2 font-semibold md:text-xl bg-lime-300 rounded-md hover:bg-lime-200 active:bg-lime-400">Get Started</Link>
    <p className="font-medium text-sm md:text-xl py-2">Already have an account? <Link href={`/login`} className="text-lime-600">Login</Link> here</p>
   </main>
   </>
  );
}
