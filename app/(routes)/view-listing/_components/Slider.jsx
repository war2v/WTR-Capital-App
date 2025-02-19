"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const Slider = ({imageList}) => {
    
  return (
    <div className="flex items-center justify-center">

      {imageList ? 
        <Carousel>
        <CarouselContent>
            {imageList.map((item, index) => (
                <CarouselItem key={index}>
                    <div className="bg-slate-200 p-2 rounded-xl border border-blue-300">
                        <Image
                            src={item.url} 
                            width={1000} 
                            height={800}
                            alt="Image"
                            className="rounded-xl object-cover md:h-[600px] md:w-[800px]"
                        />
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      :
        <div>
            <Loader/>
            
        </div> 
      }
    </div>
  );
};

export default Slider;
<></>;
