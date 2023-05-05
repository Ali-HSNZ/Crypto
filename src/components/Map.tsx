import React, { useState, useMemo, FC } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

type TPoition = {
  lat? : number | string
  lng? : number | string
}

type TMapProps = {
  confirmLocation : TPoition | any,
  onClose : React.Dispatch<React.SetStateAction<boolean>>
}

const Map : FC<TMapProps> = ({confirmLocation , onClose}) => {
  const [position, setPosition] = useState([36.566270992709384, 53.05847167968751]);
  
  const confirmLocation_handler = () => {
    confirmLocation(position)
    onClose(false)
  }

  const memoizedMap  = useMemo(() => (
    <>
      <MapContainer center={position} zoom={13} style={{ height: '100%' , width:'100%' , borderRadius : "16px" , zIndex : '0'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker 
            position={position} 
            draggable={true} 
            eventHandlers={{
                 dragend: (e) => {
                      setPosition(e.target.getLatLng());
                 }
            }}
            icon={
                 L.icon({
                   iconUrl: '/marker.png',
                   iconSize: [30, 30],
                   iconAnchor: [15, 15],
                 })
          }
         />
      </MapContainer>

      <div className="absolute left-0 right-0 w-fit bottom-10 mx-auto flex gap-x-4 justify-center ">
          <button type={'button'} className={`bg-gray-500 text-sm hover:bg-gray-600  duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>بستن</button>
          <button type={'button'} onClick={confirmLocation_handler} className={`bg-orange-500 text-sm hover:bg-orange-600  duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
               ثبت موقعیت 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
               </svg>
          </button>
     </div>
    </>
  ), [position]);

  return memoizedMap;
}

export default Map;
