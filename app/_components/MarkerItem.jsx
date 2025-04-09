import { Button } from "@/components/ui/button";
import { BathIcon, BedDouble, MapPin, X } from "lucide-react";
import Image from "next/image";

const MarkerItem = ({ item, closeHandler }) => {
  return (
    <div>
      <X onClick={closeHandler} />

      <div className="w-[300px] bg-slate-100 hover:cursor-pointer hover:border-slate-500 flex flex-col justify-center items-center border border-slate-300 shadow-md rounded-xl pb-4 pt-2 transition">
        <Button
          className="bg-blue-400
                    
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
                    m-2
                    mr-[180px]"
        >
          Details
        </Button>
        {item ?
          <Image
          src={item?.listingImages[0].url}
          width={800}
          height={150}
          className="-z-9 rounded-lg object-cover w-[250px] h-[250px]  transition"
          alt="Image"
        />
        :
        <div>
          
        </div>
        }

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
    </div>
  );
};

export default MarkerItem;
