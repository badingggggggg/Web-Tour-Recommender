'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LoadingSpinner } from '@/components/common/Loader';
import Image from 'next/image';

interface Place {
  id: string;
  title: string;
  lat: number;
  lon: number;
  thumbnail?: string;
  link?: string;
  rating?: number;
}

const fetchResorts = async (): Promise<Place[]> => {
  const response = await axios.get('/api/resorts');
  return response.data;
};

const customIcon = new L.Icon({
  iconUrl: '/map-marker.png',
  iconSize: [30, 40]
});

const SetMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
};

const ResortsMap = () => {
  const {
    data: resorts = [],
    isLoading,
    error
  } = useQuery<Place[]>({
    queryKey: ['laUnionResorts'],
    queryFn: fetchResorts
  });

  console.log(resorts);

  const defaultCenter: [number, number] = [16.6156, 120.3181];

  const initialCenter: [number, number] =
    resorts.length > 0 ? [resorts[0].lat, resorts[0].lon] : defaultCenter;

  if (error) return <p className='text-red-500'>Error loading map.</p>;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <MapContainer
          center={initialCenter}
          zoom={10}
          className='h-screen w-full rounded-lg shadow-lg'
        >
          <SetMapCenter center={initialCenter} />

          <TileLayer url='https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' />

          {resorts.map((resort) => (
            <Marker
              key={resort.id}
              position={[resort.lat, resort.lon]}
              icon={customIcon}
            >
              <Popup>
                <div className='text-center'>
                  <h3 className='text-lg font-bold'>{resort.title}</h3>
                  <Image
                    src={resort.thumbnail}
                    alt={resort.title}
                    className='mt-2 h-24 w-40 object-cover'
                    width={160}
                    height={96}
                  />
                  <p className='mt-2 text-sm text-gray-500'>
                    Rating: ⭐ {resort.rating}
                  </p>
                  <a
                    href={resort.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-2 block text-blue-500 underline'
                  >
                    View Details
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default ResortsMap;
