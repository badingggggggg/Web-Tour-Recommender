import MainLayout from '@/features/main/layout';
import React from 'react';

const AboutUs = () => {
  return (
    <MainLayout>
      <section className='py-12 text-gray-900'>
        <div className='mx-auto max-w-7xl px-4'>
          <h1 className='mb-8 text-center text-4xl font-bold text-orange-300'>
            About Us
          </h1>

          <div className='space-y-8'>
            {/* Mission Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold'>Our Mission</h2>
              <p className='text-warning text-md'>
                Our mission is to provide travelers with unforgettable
                experiences, connecting people with nature, culture, and
                adventure. We strive to make travel accessible, enjoyable, and
                meaningful for everyone.
              </p>
            </div>

            {/* Vision Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold'>Our Vision</h2>
              <p className='text-md'>
                We envision a world where everyone has the opportunity to
                explore and connect with the world&apos;s wonders. Our goal is
                to be the leading platform for personalized and unique travel
                experiences.
              </p>
            </div>

            {/* Values Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold'>Our Values</h2>
              <ul className='text-md list-disc space-y-2 pl-6'>
                <li>
                  <strong>Customer Satisfaction:</strong> We put our customers
                  first, ensuring they have the best experience.
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously innovate to
                  provide cutting-edge travel experiences and solutions.
                </li>
                <li>
                  <strong>Sustainability:</strong> We prioritize eco-friendly
                  travel options and support sustainable tourism practices.
                </li>
                <li>
                  <strong>Integrity:</strong> We operate with honesty and
                  transparency, fostering trust with our customers and partners.
                </li>
                <li>
                  <strong>Passion:</strong> We are passionate about travel and
                  committed to making it accessible to everyone.
                </li>
              </ul>
            </div>

            {/* Our History Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold'>Our History</h2>
              <p className='text-md'>
                Founded in 2010, our company has grown from a small travel
                agency into a globally recognized platform for travel
                experiences. Over the years, we have curated thousands of travel
                packages, helping countless people discover new destinations.
              </p>
            </div>

            {/* Testimonials Section */}
            <div>
              <h2 className='mb-4 text-xl font-semibold'>
                What Our Customers Say
              </h2>
              <div className='space-y-6'>
                <div className='rounded-lg p-6'>
                  <p className='text-md mb-4 text-gray-700'>
                    &quot;I had the best vacation experience with this company!
                    The entire trip was perfectly organized, and the destination
                    was absolutely breathtaking. I can&apos;t wait to book my
                    next adventure.&quot;
                  </p>
                  <p className='font-semibold'>Sarah Williams</p>
                  <p className='text-gray-500'>Traveler</p>
                </div>
                <div className='rounded-lg p-6'>
                  <p className='text-md mb-4 text-gray-700'>
                    &quot;The team went above and beyond to ensure our trip was
                    unforgettable. From personalized recommendations to
                    exceptional customer service, everything was
                    top-notch.&quot;
                  </p>
                  <p className='font-semibold'>David Anderson</p>
                  <p className='text-gray-500'>Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
