"use client";
import { LoadScript } from "@react-google-maps/api";
import Header from "./_components/Header";

const Provider = ({ children }) => {
    const libraries = ['places']
    return ( 
        <div>
            <LoadScript 
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            libraries={libraries}
            
            >
            <Header />
            {children}
            </LoadScript>
        </div>
     );
}
 
export default Provider;