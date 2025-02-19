"use client";
import { supabase } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "../_components/Slider";
import Details from "../_components/Details";

const ViewListing = ({}) => {
    const params = useParams();

    const [listingDetail, setListingDetail] = useState();
    useEffect(() => {
        GetListingDetail()
    }, [])
    const GetListingDetail = async ()=> {
        const {data, error} = await supabase
        .from('listing')
        .select('*, listingImages(url, listing_id)')
        .eq('id', params.id)
        .eq('active', true);

        if(data){
            setListingDetail(data[0])
            //console.log(data)
        }
        if(error){
            toast.error("Server Error")
        }
    }
    return ( 
        <div className="
        mt-32
           lg:mx-64
           lg:w-auto
           md:mx-32
           sm:mx-10

        ">
            <div>
                <Slider imageList={listingDetail?.listingImages}/> 
                <Details listingDetail={listingDetail}/>
            </div>
        </div>
     );
}
 
export default ViewListing;