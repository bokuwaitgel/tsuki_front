"use client";
import { useState } from "react";
import Link from "next/link";
// import Logo from "./Logo";
// import Button from "./Button";

const Navbar = () => {
  const [active, setActive] = useState<string>("/");
  return (
    <div className="m-0">
      <div className="w-full h-20 bg-slate-900 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <div
                  className={`${
                    active === "/" ? "bg-slate-600" : "bg-slate-900"
                  }  px-4 py-2 border border-blue-500 rounded`}
                >
                  <Link onClick={() => setActive("/")} href="/imageToMn">
                    <p>imageToMongolian</p>
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`${
                    active === "/service" ? "bg-slate-600" : "bg-slate-900"
                  }  px-4 py-2 border border-blue-500 rounded`}
                >
                  <Link onClick={() => setActive("/service")} href="/service">
                    <p>idk</p>
                  </Link>
                </div>
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
