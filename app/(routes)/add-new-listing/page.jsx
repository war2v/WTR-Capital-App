"use client";

import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  const nextHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    setLoader(false);
    if (data) {
      console.log("Listing Has Been Added!");
      toast({
        title: "Success",
        description: "Listing Has Been Added!",
      });
      router.replace(`edit-listing/${data[0].id}`);
    }
    if (error) {
      console.log("Error Adding Listing");
      toast.error(error);
    }
  };

  return (
    <div
      className="
           lg:mx-64
           lg:w-auto
           md:mx-32
           sm:mx-10
           mt-32

        "
    >
      <div className="p-10 flex flex-col items-center justify-center border-slate-400 m-2">
        <h2 className="font-bold text-2xl pb-10 text-slate-700">
          Add New Listing
        </h2>
        <div className="py-10 px-20 border w-full border-slate-300 rounded-lg flex flex-col gap-5 shadow-md">
          <h2 className="font-semibold text-slate-400">Find Your Property</h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            className="bg-blue-400 text-slate-100"
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListing;
