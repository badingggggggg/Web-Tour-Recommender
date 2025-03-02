import Link from 'next/link';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Button } from './ui/button';

interface ImageCardProps {
  name: string;
  description: string;
  imageUrl: string;
  location_url?: string;
  price?: number;
  price_currency?: string;
  rating?: number;
  viewUrl?: string;
}
const ImageCard: React.FC<ImageCardProps> = ({
  name,
  description,
  imageUrl,
  location_url,
  price,
  price_currency = 'PHP',
  rating = 4.5,
  viewUrl
}) => {
  return (
    <div className='group relative h-96 w-full overflow-hidden rounded-lg shadow-md'>
      {/* Image Container */}
      <div
        className='transition-transform duration-500 group-hover:scale-110'
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100%',
          width: '100%'
        }}
      ></div>

      <div className='absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-0'></div>

      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white'>
        <Link
          href={location_url || '#'}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          <div className='mb-2 flex items-center gap-2 text-sm'>
            <IoLocationSharp size={20} />
            <p>{name}</p>
          </div>
        </Link>

        {/* <p className='truncate text-sm'>{description}</p> */}

        {price !== undefined && (
          <p className='mt-2 text-sm text-yellow-300'>
            {price_currency} {price.toFixed(2)}
          </p>
        )}

        <div className='mt-2 flex items-center'>
          {[...Array(5)].map((_, index) =>
            index < Math.floor(rating) ? (
              <FaStar key={index} className='text-yellow-400' size={15} />
            ) : (
              <FaRegStar key={index} className='text-gray-400' size={15} />
            )
          )}
          <span className='ml-2 text-xs'>{rating.toFixed(1)}</span>
        </div>

        {viewUrl && (
          <Link href={viewUrl}>
            <Button className='mt-4 w-full bg-orange-500 text-white hover:bg-orange-600'>
              Explore →
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
