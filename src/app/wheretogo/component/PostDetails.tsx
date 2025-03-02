'use client';

import { usePost } from '@/hooks/use-post';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { LoadingSpinner } from '@/components/common/Loader';
import Image from 'next/image';

const PostDetails = () => {
  const { postId } = useParams();
  const { data: post, isLoading, error } = usePost(Number(postId));

  if (isLoading) return <LoadingSpinner />;

  if (error || !post) {
    return <p className='text-center text-red-500'>Failed to load post.</p>;
  }

  return (
    <div className='mx-auto max-w-7xl space-y-8 p-6'>
      {/* Image Gallery */}
      <div className='grid grid-cols-2 gap-2 overflow-hidden'>
        {post && post.images && post?.images.length > 1 ? (
          <>
            <Image
              src={post.images[0]}
              alt='Main Image'
              className='h-56 w-full rounded-md object-cover transition-transform duration-300 hover:scale-105'
              width={400}
              height={200}
            />
            <div className='grid grid-cols-2 gap-2 overflow-hidden'>
              {post.images.slice(1, 4).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className='h-28 w-full rounded-md object-cover transition-transform duration-300 hover:scale-105'
                  width={200}
                  height={100}
                />
              ))}
            </div>
          </>
        ) : (
          <Image
            src={post.image_url}
            alt={post.title}
            className='h-64 w-full rounded-lg object-cover shadow-lg'
            width={400}
            height={250}
          />
        )}
      </div>

      {/* Content Section */}
      <div className='space-y-6'>
        {/* Title & Location */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <h1 className='text-lg font-semibold text-gray-900'>{post.title}</h1>
          <Link
            href={`https://www.google.com/maps/search/?q=${encodeURIComponent(post.title)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline md:mt-0'
          >
            <IoLocationSharp className='text-lg' /> {post.location}
          </Link>
        </div>

        {/* Description */}
        <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-md'>
          <h2 className='text-sm font-medium text-gray-700'>Description</h2>
          <p className='mt-1 text-sm text-gray-600'>
            {post.description || 'No description available.'}
          </p>

          <ul className='mt-5 list-disc pl-5'>
            {post.amenities.map((amenity) => (
              <li key={amenity.id} className='text-xs text-gray-700'>
                <div className='flex items-center gap-2'>
                  {amenity.amenity_name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md'>
          <div>
            <p className='text-sm text-gray-500'>Price</p>
            <p className='text-xs text-green-500'>
              {post.price_currency} {post.price}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Price Per Night</p>
            <p className='text-xs text-green-500'>
              {post.price_currency} {post.price_per_night}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Seasonal Price</p>
            <p className='text-xs text-green-500'>
              {post.price_currency} {post.seasonal_price}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Discount Price</p>
            <p className='text-xs text-red-500'>
              -{post.price_currency} {post.discount_price}
            </p>
          </div>
        </div>

        {/* Ratings */}
        <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md'>
          <h2 className='text-sm font-medium text-gray-700'>Ratings</h2>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < 4 ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className='text-sm text-gray-700'>(4.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
