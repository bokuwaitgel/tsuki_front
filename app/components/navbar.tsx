import React from "react";
import Link from "next/link";
// import Logo from "./Logo";
// import Button from "./Button";

const Navbar = () => {
  return (
    <div className="m-0">
      <div className="w-full h-20 bg-slate-900 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>GetDocument</p>
                </Link>
              </li>
              <li>
                <Link href="/service">
                  <p>Question&Answer</p>
                </Link>
              </li>
              {/* <li>
                <Link href="/contact">
                  <p>Contacts</p>
                </Link>
              </li> */}
            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
