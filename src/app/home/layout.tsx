import Navbar from "@/components/Navbar";
import {Roboto} from "next/font/google";

const roboto = Roboto({weight:"500",subsets:["latin"]});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex gap-5 w-full">
          <div className={`${roboto.className} md:w-[14%] w-[97%] max-sm:hidden `}>
            {" "}
            <Navbar/> 
          </div>
          <div className="md:w-[84%] "> {children}</div>
        </div>
      </body>
    </html>
  );
}
