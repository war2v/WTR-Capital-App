"use client";
import { supabase } from "@/utils/supabase/client";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import GoogleMapSection from "./GoogleMapSection";

const ListingMapView = () => {
  const [listing, setListing] = useState([]);
  const [searchAddress, setSearchAddress] = useState();
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(0);
  const [parking, setParking] = useState(0);
  const [p_type, setType] = useState();
  const [type, setRType] = useState("Sell");
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (data) {
      //console.log(type);
      setListing(data);
    }
    if (error) {
      toast("Server Error");
    }
    return data;
  };

  //useEffect(() => {
  //    console.log(listing)
  //}, [listing])

  const handleSearchClick = async () => {
    const searchTerm = searchAddress?.value?.structured_formatting.main_text;
    console.log(type);
    let query = supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", beds)
      .gte("bathroom", baths)
      .gte("price", price)
      .gte("parking", parking)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    if (p_type) {
      query = query.eq("propertyType", p_type);
    }
    const { data, error } = await query;
    if (data) {
      console.log(data);
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:w-[700px] md:w-[0px]">
      <div className="fixed left-10 bottom-10 lg:w-[700px] md:w-[0px] mx-4  rounded-xl p-2 xl:bg-slate-300 border xl:border-slate-400 ">
        <GoogleMapSection coordinates={coordinates} listing={listing} />
      </div>
      <div className="absolute right-10 top-16">
        <div>
          <Listing
            listing={listing}
            handleSearchClick={handleSearchClick}
            searchAddress={(v) => setSearchAddress(v)}
            setBeds={setBeds}
            setBaths={setBaths}
            setParking={setParking}
            setPrice={setPrice}
            setType={setType}
            type={type}
            setRType={setRType}
            setCoordinates={setCoordinates}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingMapView;
