import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';


type TMapWrapperProps ={
  setCurrentPosition: any
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  currentPosition: [number , number] | undefined  
}

const MapWrapper: React.FC<TMapWrapperProps> = ({ onClose, setCurrentPosition, currentPosition }) => {

  const [position, setPosition] = useState<LatLngExpression>(currentPosition ?? [36.5662, 53.0584]);
  const [mapClickHandler, setMapClickHandler] = useState<EventListener | null>(null);

  // handle selected/confirm location
  const confirmLocationHandler = () => {
    setCurrentPosition(position);
    onClose(false);
  };

  const UpdateMarkerPosition = () => {
    const map = useMapEvents({
      move: () => {
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
      zoomend: () => {
        setPosition(position);
      },
    });

    return null;
  };

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
    };

    setMapClickHandler(() => handleClick);

    return () => {
      if (mapClickHandler) {
        document.removeEventListener('click', mapClickHandler);
      }
    };
  }, []);

  return (
    <div className='relative w-full h-full rounded-xl overflow-hidden'>
      <MapContainer className='h-full absolute inset-0 z-10' center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={position}
          draggable={false}
          icon={L.icon({ iconUrl: '/marker.png', iconSize: [40, 40], iconAnchor: [15, 15] })}
          eventHandlers={{ dragend: (e:any) => setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]) }}
        />

        <UpdateMarkerPosition />

      </MapContainer>

      <div className="absolute z-20 left-0 right-0 w-fit bottom-5 mx-auto flex gap-x-4 justify-center items-center">
        
        <button type='button' onClick={() => onClose(false)} className='bg-gray-500 text-sm hover:bg-gray-600 duration-150 rounded-md font-iranyekan-bold text-blue-50 px-6 py-3'>
          بستن
        </button>
        
        <button type='button' onClick={confirmLocationHandler} className='bg-orange-500 text-sm hover:bg-orange-600 duration-150  rounded-md flex gap-x-3 font-iranyekan-bold text-blue-50 px-6 py-3'>
          ثبت موقعیت
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default MapWrapper;
