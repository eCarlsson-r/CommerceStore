"use client";
import { Button } from "@/components/ui/button";
import { useBranches } from "@/hooks/useDataFetchers";
import { MapPin } from "lucide-react";

export default function LocationsPage() {
  const { data: branches } = useBranches();

  const handleGetDirections = (branchName: string, address?: string) => {
    if (!address) return;
    // We encode the query to handle spaces and special characters safely
    const destination = encodeURIComponent(`${branchName}, ${address}`);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl font-black uppercase italic italic mb-4 tracking-tighter">Our Locations</h1>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-16">Visit our outlets at the following locations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches?.map(branch => (
          <div key={branch.id} className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 hover:border-primary transition-all group">
            <h3 className="text-xl font-black uppercase italic italic group-hover:text-primary transition-colors">{branch.name}</h3>
            <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest leading-loose">{branch.address}</p>
            
            <div className="mt-8 flex justify-between items-center">
               <div className="text-[10px] font-black uppercase tracking-tighter">
                  <p className="opacity-40">Opening Hours</p>
                  <p>10:00 - 22:00 WIB</p>
               </div>
               <Button 
                 onClick={() => handleGetDirections(branch.name, branch.address)}
                 className="p-4 bg-white text-primary rounded-2xl shadow-sm hover:bg-primary hover:text-white transition-all"
               >
                 <MapPin size={20} />
               </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}