"use client";

import { useEffect, useState } from "react";

const GetUserLocation = () => {
   const [ip, setIP] = useState(null);
   const [location, setLocation] = useState<any>(null);

   const geoLocationKey = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY2;

   useEffect(() => {
      fetchIP();

      // @ts-ignore-next-line
   }, []);

   useEffect(() => {
      if (ip) {
         fetchLocation(ip);
      }
   }, [ip]);

   const fetchIP = async () => {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIP(data.ip);
   };

   const fetchLocation = async (ipAddress: string) => {
      const res = await fetch(
         `https://ipgeolocation.abstractapi.com/v1/?api_key=${geoLocationKey}&ip_address=${ipAddress}`
      );
      const data = await res.json();
      console.log(data);

      setLocation(data);
   };

   return (
      <div>
         <h1>Your IP Address and Location</h1>
         {ip ? <p>IP Address: {ip}</p> : <p>Loading IP Address...</p>}
         {location ? (
            <div>
               <p>
                  Location: {location.country}, {location.city}
               </p>
            </div>
         ) : (
            ip && <p>Loading Location...</p>
         )}
      </div>
   );
};

export default GetUserLocation;
