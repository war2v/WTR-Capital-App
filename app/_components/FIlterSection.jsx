
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Bath, Bed, Car, House, LucideDollarSign } from "lucide-react";
import { useState } from "react";

  
const FilterSection = ({
    setBeds, setBaths, setParking, setPrice, setType
}) => {
    return ( 
        <div className="m-2 text-slate-600 flex justify-center items-center md:gap-6 gap-4 ">
            <div className="flex flex-col justify-center items-center">
                <h2 className="flex gap-3"><Bed/> Beds</h2>
                <Select onValueChange={setBeds} >
                    <SelectTrigger className="lg:w-[110px] md:w-[120px] sm:w-[100px] border border-slate-400" >
                        <SelectValue placeholder="2+" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="flex gap-3"><Bath/>Baths</h2>
                <Select onValueChange={setBaths} >
                    <SelectTrigger className="lg:w-[110px] md:w-[120px] sm:w-[100px] border border-slate-400">
                        <SelectValue placeholder="1+" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">4+</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="flex gap-3"><LucideDollarSign /> Price</h2>
                <Select onValueChange={setPrice} >
                    <SelectTrigger className="lg:w-[110px] md:w-[120px] sm:w-[100px] border border-slate-400">
                        <SelectValue placeholder='$100,000+'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="100000">$100,000+</SelectItem>
                        <SelectItem value="200000">$200,000+</SelectItem>
                        <SelectItem value="300000">$400,000+</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="flex gap-3"><Car /> Parking</h2>
                <Select onValueChange={setParking} >
                    <SelectTrigger className="lg:w-[110px] md:w-[120px] sm:w-[100px] border border-slate-400">
                        <SelectValue placeholder='1+'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="flex gap-3"><House /> Type</h2>
                <Select onValueChange={(value) => value == 'All'? setType(null) : setType(value)} >
                    <SelectTrigger className="lg:w-[110px] md:w-[120px] sm:w-[100px] border border-slate-400">
                        <SelectValue placeholder='Town House'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Single Family Home">Single Family Home</SelectItem>
                    </SelectContent>
                </Select>

            </div>
        </div>
     );
}
 
export default FilterSection;