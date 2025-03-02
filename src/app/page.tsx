import MainLayout from '@/features/main/layout';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { popularTours } from '@/constants/mock-api';
import { IoLocationSharp } from 'react-icons/io5';

const boxItems = [
  {
    title: 'Destinations',
    description: 'Explore beautiful places around the world.',
    path: '/destinations',
    bgColor: 'bg-blue-500'
  },
  {
    title: 'Adventure',
    description: 'Experience thrilling adventures like never before.',
    path: '/adventure',
    bgColor: 'bg-green-500'
  },
  {
    title: 'Relaxation',
    description: 'Relax and unwind at the most serene destinations.',
    path: '/relaxation',
    bgColor: 'bg-purple-500'
  },
  {
    title: 'Packages',
    description: 'Choose from a variety of curated travel packages.',
    path: '/packages',
    bgColor: 'bg-yellow-500'
  },
  {
    title: 'Support',
    description: 'Our team is here to assist you every step of the way.',
    path: '/support',
    bgColor: 'bg-red-500'
  }
];

const Hero = () => {
  return (
    <MainLayout>
      <section className='relative'>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className='absolute left-0 top-0 h-full w-full object-cover'
        >
          <source src='/video.mp4' type='video/mp4' />
        </video>
        {/* Content Overlay */}
        <div className='relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 text-center'>
          <div className='max-w-3xl text-left'>
            <h1 className='mb-4 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl'>
              Welcome to La Union
            </h1>
            <p className='mx-auto mb-6 max-w-3xl text-base text-white sm:text-lg md:text-xl lg:text-2xl'>
              Discover the hidden gems of La Union, Philippines.
            </p>
            <p className='mx-auto mb-6 max-w-3xl text-base text-white sm:text-lg md:text-xl lg:text-2xl'>
              Whether you&apos;re looking for adventure, relaxation, or the
              perfect spot to watch the sunset, La Union offers something for
              everyone.
            </p>
            <Link
              href='/wheretogo'
              className='flex w-52 items-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-lg text-white transition duration-300 hover:bg-secondary hover:text-gray-700'
            >
              Explore More <ArrowRight className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div>
          {/* "What's New" Title */}
          <p className='mb-4 text-center text-xl italic text-orange-500'>
            What&apos;s New
          </p>
          {/* "Popular Tour" Title */}
          <h2 className='mb-6 text-center text-3xl font-bold'>Popular Tour</h2>

          <section className='py-12'>
            <div className='mx-auto max-w-7xl px-4'>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                {popularTours.map((item, index) => (
                  <div
                    key={index}
                    className='group relative h-96 w-full overflow-hidden rounded-lg shadow-md'
                  >
                    {/* Image Container */}
                    <div
                      className='transition-transform duration-500 group-hover:scale-110'
                      style={{
                        backgroundImage: `url(${item.imageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: '100%',
                        width: '100%'
                      }}
                    ></div>

                    {/* Black Overlay */}
                    <div className='absolute inset-0 bg-black opacity-60 transition-opacity duration-300 group-hover:opacity-0'></div>

                    {/* Text Content */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                      <Link
                        href={item.location_url || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <div className='text-md mb-2 flex items-center gap-2 font-semibold'>
                          <IoLocationSharp size={20} />
                          <p>{item.name}</p>
                        </div>
                      </Link>

                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className='mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'>
        {boxItems.map((item, index) => (
          <div
            key={index}
            className={`p-6 text-center text-white ${item.bgColor}`}
          >
            <h3 className='mb-2 text-xl font-semibold'>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <section className='bg-gray-100 py-16'>
        <div className='mx-auto flex max-w-7xl flex-col-reverse items-center gap-5 px-4 lg:flex-row'>
          <div className='lg:w-1/2'>
            <h2 className='mb-4 text-3xl font-semibold text-orange-300'>
              About La Union
            </h2>
            <p className='text-lg'>
              La Union is a beautiful province located in the Ilocos Region of
              the Philippines. Known for its pristine beaches, vibrant surf
              culture, and scenic views, it has become a popular destination for
              both locals and tourists. Whether you&apos;re an adventure seeker,
              a nature lover, or simply looking to relax, La Union offers the
              perfect getaway for all types of travelers.
            </p>
            <p className='mt-4 text-lg'>
              Enjoy a variety of outdoor activities such as surfing, hiking, and
              exploring the province&apos;s rich cultural heritage. From the
              peaceful shores of San Juan to the historic churches and natural
              parks, La Union has something for everyone.
            </p>
          </div>
          <div className='mb-6 lg:mb-0 lg:w-1/2'>
            <Image
              src='/auth-bg.jpg'
              alt='La Union View'
              className='h-auto w-full'
              width={800}
              height={500}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Hero;
