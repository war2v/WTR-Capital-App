"use client";

import { Button } from "@/components/ui/button";

import { ArrowRight, Home, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase/client";

import Modal from "./Modal";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import handleOwnerSignUp from "../_actions/signUpOwner";

const Header = () => {
  const [isTenantSignInModalOpen, setIsTenantSignInModalOpen] = useState(false);
  const [isTenantSignUpModalOpen, setIsTenantSignUpModalOpen] = useState(false);
  const [isOwnerSignInModalOpen, setIsOwnerSignInModalOpen] = useState(false);
  const [isOwnerSignUpModalOpen, setIsOwnerSignUpModalOpen] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    cell: "",
    password: "",
    password2: "",
  });

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const openTenantSignUpModal = () => {
    if (isTenantSignInModalOpen) {
      setIsTenantSignInModalOpen(false);
    }
    setIsTenantSignUpModalOpen(true);
  };

  const openTenantSignInModal = () => {
    if (isTenantSignUpModalOpen) {
      setIsTenantSignUpModalOpen(false);
    }
    setIsTenantSignInModalOpen(true);
  };

  const openOwnerSignUpModal = () => {
    if (isOwnerSignInModalOpen) {
      setIsOwnerSignInModalOpen(false);
    }
    setIsOwnerSignUpModalOpen(true);
  };

  const openOwnerSignInModal = () => {
    if (isOwnerSignUpModalOpen) {
      setIsOwnerSignUpModalOpen(false);
    }
    setIsOwnerSignInModalOpen(true);
  };

  const handleTenantSignIn = async (e) => {
    e.preventDefault();
    console.log("inside Owner Sign In");
    console.log(signInFormData);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInFormData.email,
      password: signInFormData.password,
    });
    if (error || !data?.user) {
      console.log(error + " or no user");
      return;
    }
    console.log(data.session);
  };

  const handleOwnerSignIn = async (e) => {
    e.preventDefault();
    console.log("inside Owner Sign In");
    console.log(signInFormData);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInFormData.email,
      password: signInFormData.password,
    });
    if (error || !data?.user) {
      console.log(error + " or no user");
      return;
    }
    console.log(data.session);
  };

  const handleTenantSignUp = async (e) => {
    e.preventDefault();
    console.log("inside Tenant Sign Up");
    console.log(signUpFormData.password);
    const { data, error } = supabase.auth.signUp({
      email: signUpFormData.email,
      password: signUpFormData.password,
      options: {
        data: {
          first_name: "",
          last_name: "",
          account_type: "T",
        },
      },
    });

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

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
      <div></div>
      <div
        className="
                flex
                items-center
                gap-x-5
                w-max
            "
      >
        {/*
          User Authentication Modals
        */}

        <div className="flex gap-x-2">
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
          transition"
            onClick={openTenantSignInModal}
          >
            tenants
          </Button>
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
            transition"
            onClick={openOwnerSignInModal}
          >
            owners
          </Button>

          <SignInModal
            isOpen={isTenantSignInModalOpen}
            title="Tenant"
            onSubmit={handleTenantSignIn}
            openSignUp={openTenantSignUpModal}
            setIsOpen={setIsTenantSignInModalOpen}
            signInFormData={signInFormData}
            setSignInFormData={setSignInFormData}
          />
          <SignUpModal
            isOpen={isTenantSignUpModalOpen}
            title="Tenant"
            onSubmit={handleTenantSignUp}
            openSignIn={openTenantSignInModal}
            setIsOpen={setIsTenantSignUpModalOpen}
            signUpFormData={signUpFormData}
            setSignUpFormData={setSignUpFormData}
          />

          <SignInModal
            isOpen={isOwnerSignInModalOpen}
            title="Owner"
            onSubmit={handleOwnerSignIn}
            openSignUp={openOwnerSignUpModal}
            setIsOpen={setIsOwnerSignInModalOpen}
            signInFormData={signInFormData}
            setSignInFormData={setSignInFormData}
          />

          <SignUpModal
            isOpen={isOwnerSignUpModalOpen}
            title="Owner"
            onSubmit={handleOwnerSignUp}
            openSignIn={openOwnerSignInModal}
            setIsOpen={setIsOwnerSignUpModalOpen}
            signUpFormData={signUpFormData}
            setSignUpFormData={setSignUpFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
