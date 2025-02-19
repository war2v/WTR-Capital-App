import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import { Bath, BedDouble, Calendar, CarFront, DollarSign, MapPin } from "lucide-react";
import { useEffect } from "react";

const Details = ({listingDetail}) => {
    const borderCSS = "bg-slate-300 p-2 rounded-xl border border-slate-400";

    useEffect(() => console.log(listingDetail), [listingDetail]);
    return listingDetail&&( 
        <div className="flex flex-col gap-y-2 mt-4 p-4 bg-slate-200 rounded-xl  border border-slate-400 text-slate-900">
            <div className="grid grid-cols-4 g items-center gap-x-4">
                <h1 className="font-bold text-3xl">
                    ${listingDetail?.price}
                </h1> 
                 
                <div className={`flex items-center gap-x-2 ${borderCSS}`}>
                    <h2>HOA: </h2>
                    <h1 className="text-xl">
                        ${listingDetail?.hoa}
                    </h1>   
                </div> 

                <div className="bg-slate-300 text-slate-700 p-2 rounded-xl border border-slate-400">
                    <h2>{listingDetail?.propertyType}</h2>
                </div>  
                <div className="flex gap-3">
                    <Button 
                    className="
                        
                        text-slate-100
                        border
                        
                        bg-blue-400
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-slate-200
                        hover:text-blue-400
                        hover:border-blue-300
                        
                        transition"
                        >
                            Share
                    </Button>   
                    <Button
                    className="
                    font-semibold
                    bg-slate-300
                    text-blue-400
                    border
                    border-blue-300
                    rounded-xl
                    hover:cursor-pointer
                    hover:scale-105
                    hover:bg-blue-400
                    hover:text-slate-100
                    hover:border-none
        
                    transition">
                        Make Inquiry
                    </Button>
                </div>        
                
            </div>
            <div className="flex items-center mt-2">
                    
                    <div className={`flex ${borderCSS}`}>
                        <MapPin />
                        <h1>{listingDetail?.address}</h1>
                    </div> 
            </div>
            <h1 className="flex text-3xl justify-center  text-blue-400 border-t border-blue-300 mt-2">
                Features
            </h1>
            <div className="flex justify-center items-center gap-x-8">
                
                <div className={"flex bg-slate-300 p-2 rounded-xl border border-slate-400 gap-x-2"}>
                    <Bath /> 
                    <h2 >
                        Baths : {listingDetail?.bathroom}   
                    </h2>
                </div>
                <div className={"flex bg-slate-300 p-2 rounded-xl border border-slate-400 gap-x-2"}>
                    <BedDouble /> 
                    <h2 >
                        Beds : {listingDetail?.bedroom}   
                    </h2>
                </div>
                <div className={"flex bg-slate-300 p-2 rounded-xl border border-slate-400 gap-x-2"}>
                    <CarFront /> 
                    <h2 >
                        Parking : {listingDetail?.parking}   
                    </h2>
                </div>
                
            </div>
           
            <div className="flex justify-center items-center gap-x-8">
                <div className={`flex gap-x-1 ${borderCSS}`}>
                    <Calendar />
                    <h2>
                    Year : {listingDetail?.builtIn}
                    </h2>
                </div>
                <div className={"flex bg-slate-300 p-2 rounded-xl border border-slate-400 gap-x-2"}>
                    <CarFront /> 
                    <h2 >
                        Area : {listingDetail?.area}  
                    </h2>
                </div>
                <div className={"flex bg-slate-300 p-2 rounded-xl border border-slate-400 gap-x-2"}>
                    <CarFront /> 
                    <h2 >
                        Area : {listingDetail?.lotSize}
                    </h2>
                </div>
                
                
                
            </div>
            <div className="flex items-center justify-start bg-slate-100 border border-slate-400 p-2 rounded-md">
                <h1>
                    {listingDetail?.description}
                </h1>
            </div>
            
            <div>
                <h2 className="flex items-center justify-center text-3xl  text-blue-400 border-b border-blue-300 my-2">
                    Location
                </h2>
                <GoogleMapSection 
                coordinates={listingDetail.coordinates}
                listing={[listingDetail]}
                />
            </div>
            
            
        </div>
     );
}
 
export default Details;
