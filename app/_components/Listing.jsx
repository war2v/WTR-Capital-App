"use client";
import {
  BathIcon,
  BedDouble,
  MapPin,
  Search,
  ChartNoAxesGantt,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FIlterSection";
import dynamic from "next/dynamic";

const Listing = ({
  listing,
  handleSearchClick,
  searchAddress,
  setBeds,
  setBaths,
  setParking,
  setPrice,
  setType,
  setRType,
  type,
  setCoordinates,
}) => {
  useEffect(() => {
    //console.log(selectedAddress  + " In side listing")
  }, []); //selectedAddress])
  const [address, setAddress] = useState();
  return (
    <div>
      <div className="w-[800px] z-2 bg-slate-100 pt-14">
        <div className="flex pb-2 md:ml-0 ml-2">
          <GoogleAddressSearch
            setCoordinates={setCoordinates}
            selectedAddress={(v) => {
              console.log(v);
              searchAddress(v);
              setAddress(v);
            }}
          />
          {type == "Rent" ? (
            <Button
              onClick={() => setRType("Sell")}
              className="
                            mx-2
                            w-40
                            h-10
                            text-slate-100
                            border
                            hover:border-blue-400
                            bg-blue-400
                            rounded-xl
                            hover:cursor-pointer
                            hover:scale-105
                            hover:bg-blue-100
                            hover:text-blue-400
                            transition
                            group"
            >
              <ChartNoAxesGantt className="group-hover:animate-spin transition" />
              {type}
            </Button>
          ) : (
            <Button
              onClick={() => setRType("Rent")}
              className="
                            bg-blue-100
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
                            mx-2
                            group
                            "
            >
              <ChartNoAxesGantt className="group-hover:animate-spin transition" />
              {type}
            </Button>
          )}
          <Button
            onClick={handleSearchClick}
            className="
                        mx-2
                        text-slate-100
                        border
                        hover:border-blue-400
                        bg-blue-400
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-100
                        hover:text-blue-400
                        transition"
          >
            <Search />
            Explore
          </Button>
        </div>
        <div>
          <FilterSection
            setBeds={setBeds}
            setBaths={setBaths}
            setParking={setParking}
            setPrice={setPrice}
            setType={setType}
          />
        </div>
      </div>
      <div className=" z-1">
        {address && (
          <div className="p-2">
            <h2 className="text-sm font-mono text-slate-600">
              Found{" "}
              <span className="font-extrabold text-blue-400">
                {listing?.length}
              </span>{" "}
              for <span className="text-lg font-bold">{address?.label}</span>
            </h2>
          </div>
        )}
      </div>
      <div className="-z-10 static grid grid-cols-1 md:grid-cols-2 gap-8">
        {listing?.map((item, index) => {
          return (
            <Link key={index} href={"/view-listing/" + item.id}>
              <div className="hover:cursor-pointer hover:border-slate-500 flex flex-col justify-center items-center border border-slate-300 shadow-md rounded-xl pb-4 pt-2 transition">
                <Image
                  src={item?.listingImages[0].url}
                  width={800}
                  height={150}
                  className="-z-9 rounded-lg object-cover w-[250px] h-[250px]  transition"
                  alt="Image"
                />

                <div className="w-full gap-y-1 pl-3 flex flex-col justify-center items-center border-t border-slate-200 mt-2">
                  <div className="flex w-full ">
                    <h2 className="font-bold text-xl">${item?.price}</h2>
                  </div>
                  <div className="flex w-full gap-4">
                    <h2 className="bg-slate-200 rounded-md p-2">
                      {item?.propertyType}{" "}
                    </h2>
                    <h2 className="flex text-slate-600 bg-slate-200 rounded-md p-2">
                      <BedDouble />
                      {item?.bedroom} bed
                    </h2>
                    <h2 className="flex text-slate-600 bg-slate-200 rounded-md p-2">
                      <BathIcon />
                      {item?.bathroom} bath
                    </h2>
                  </div>
                  <div className="flex w-full bg-slate-200 rounded-md p-2">
                    <MapPin size={20} className="text-slate-400" />
                    <h2 className="text-slate-600 text-sm">{item?.address}</h2>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Listing), { ssr: false });
