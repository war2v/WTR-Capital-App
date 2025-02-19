"use client";

import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ArrowRight, Home, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {}, []);

  return (
    <div
      className="
            z-50
            fixed
            top-0
            md:h-[100px]
            flex
            items-center
            justify-center
            border-slate-300
            bg-slate-100
            border-b
            p-3
           
            w-screen
            text-slate-800
            font-semibold
        "
    >
      <div
        className="
                flex
                items-center
                gap-x-5
                w-full
                "
      >
        <Link
          className="
                        flex
                        items-center
                        justify-center
                        m-6
                    "
          href="/"
        >
          <Image
            src={""}
            width={35}
            height={35}
            alt="logo"
            className="
                                m-2
                                hover:scale-110
                                hover:cursor-pointer
                                transition
                            "
          />
          <h1
            className={`
                                font-medium
                                text-2xl
                                font-sans
                                hover:scale-105
                                text-slate-400 
                                hover:text-blue-400
                                hover:cursor-pointer
                                
                                hidden
                                sm:flex
                                group
                                transition
                            `}
          >
            WTRCAPITAL
          </h1>
        </Link>
        <Link href="/">
          <Button
            className="
                        hidden
                        lg:flex
                        bg-slate-100
                        text-blue-400
                        border
                        border-slate-300
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-slate-100
                        hover:border-none
                        transition
                        "
          >
            <h2
              className="
                            hover:scale-105
                            hover:text-slate-100
                            transition
                            hover:cursor-pointer
                            "
            >
              Online Payment
            </h2>
          </Button>
        </Link>

        <Link href="/">
          <Button
            className="
                        bg-slate-100
                        text-blue-400
                        border
                        border-slate-300
                        hidden
                        md:flex
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-slate-100
                        hover:border-none
                        transition
                        "
          >
            <h2
              className="
                            hover:scale-105
                            hover:text-slate-100
                            hover:cursor-pointer
                            transition
                            "
            >
              Find An Agent
            </h2>
          </Button>
        </Link>

        <Link href="/">
          <Button
            className="
                        
                        bg-slate-100
                        text-blue-400
                        border
                        border-slate-300
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-slate-100
                        hover:border-none
                        transition
                        "
          >
            <ArrowRight className="hidden md:flex" />
            <Home className="md:hidden" />
            <span className="hidden sm:flex hover:cursor-pointer">
              Property
            </span>{" "}
            <span className="hidden sm:flex hover:cursor-pointer">
              Management
            </span>
          </Button>
        </Link>
      </div>
      <div
        className="
                flex
                items-center
                justify-center
                w-full
                gap-x-5
                
            "
      ></div>
      <div>
        {!user ? (
          <SignInButton
            className="
                    bg-slate-100
                    w-40
                    h-10
                    text-blue-400
                    border
                    border-primary
                    rounded-xl
                    hover:cursor-pointer
                    hover:scale-105
                    hover:bg-blue-400
                    hover:text-slate-100
                    hover:border-none
                    transition
                    font-normal
                    text-sm
                    m-2
                    "
          />
        ) : (
          <div className="flex gap-x-3">
            <Link href="/add-new-listing">
              <Button
                className="
                    bg-slate-100
                        w-40
                        h-10
                        text-blue-400
                        border
                        border-primary
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-slate-100
                        hover:border-none
                        transition
                        font-normal
                        text-sm
                        m-2"
                disabled={!user}
                onClick={(url = "/") => onClick(url)}
              >
                <Plus />
                Add Listing
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                className="
              
              bg-blue-400
                
                text-slate-100
                rounded-xl
                hover:cursor-pointer
                hover:scale-105
                hover:bg-blue-100
                hover:text-blue-500
                hover:border
                hover:border-blue-300
                transition
                font-normal
                text-sm
                m-2"
                disabled={!user}
                onClick={(url = "/dashboard") => onClick(url)}
              >
                <Plus />
                Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div
        className="
                flex
                items-center
                gap-x-5
                w-max
            "
      >
        <Link href="/">
          {isSignedIn ? (
            <div
              className="  
                        flex
                    "
            >
              <UserButton />
              <SignOutButton
                className="
                            bg-slate-100
                            w-40
                            h-10
                            text-blue-400
                            border
                            border-slate-300
                            rounded-xl
                            hover:cursor-pointer
                            hover:scale-105
                            hover:bg-blue-400
                            hover:text-slate-100
                            hover:border-none
                            transition
                            font-normal
                            text-sm
                            m-2
                            "
              />
            </div>
          ) : (
            <h2
              className=" 
                            hover:scale-105
                            px-3
                            hover:text-blue-400
                            transition
                            hover:cursor-pointer
                            sm:flex
                        "
            >
              <SignInButton
                className="
                                bg-slate-100
                                w-48
                                h-10
                                text-blue-400
                                border
                                border-slate-300
                                rounded-xl
                                hover:cursor-pointer
                                hover:scale-105
                                hover:bg-blue-400
                                hover:text-slate-100
                                hover:border-none
                                transition
                                font-normal
                                text-sm
                                "
              >
                Owner/Tenant Login
              </SignInButton>
            </h2>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
