import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Logo from "../Logo";
 
export function GuestNavbar({theme, toggleTheme}) {
  const navList = (
    <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 flex-row items-center lg:gap-3">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="hidden md:block p-1 font-normal py-2 px-3 rounded-xl"
      >
        <a href="#use-cases" className="flex items-center text-lg md:text-md font-bold text-black dark:text-white">
          Use Cases
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="hidden md:block p-1 font-normal py-2 px-3 rounded-xl"
      >
        <a href="#pricing" className="flex items-center text-lg md:text-md font-bold text-black dark:text-white">
          Pricing
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal py-2 px-3 rounded-xl dark:bg-gray-900 bg-gray-100 cursor-pointer"
      >
        <a href="#" className="flex items-center text-lg md:text-md font-bold text-purple-500">
          Get Started
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal py-2 px-3 rounded-xl dark:bg-gray-900 bg-gray-100 cursor-pointer"
        onClick={toggleTheme}
      >
        <a href="#" className="flex items-center text-lg md:text-md font-bold text-purple-500">
          {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </a>
      </Typography>
    </ul>
  );
 
  return (
      <Navbar className="bg-transparent sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow dark:shadow-black dark:border-gray-900">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="mr-4">{navList}</div>
          </div>
        </div>
      </Navbar>
  );
}