import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/',
    icon: <FaFacebookF />
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/',
    icon: <FaInstagram />
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/',
    icon: <FaTwitter />
  }
];

const Footer = () => {
  return (
    <footer className='bg-blue-950 py-8 text-white'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <ul>
              <li>
                <Link href='/map'>
                  <span className='text-gray-400 hover:text-white'>Map</span>
                </Link>
              </li>
              <li>
                <Link href='/wheretogo'>
                  <span className='text-gray-400 hover:text-white'>
                    Where To Go
                  </span>
                </Link>
              </li>
              <li>
                <Link href='/about'>
                  <span className='text-gray-400 hover:text-white'>About</span>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <span className='text-gray-400 hover:text-white'>
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Support</h3>
            <ul>
              <li>
                <Link href='#'>
                  <span className='text-gray-400 hover:text-white'>
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <span className='text-gray-400 hover:text-white'>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Follow Us</h3>
            <ul className='flex space-x-4'>
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-400 hover:text-white'
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Contact</h3>
            <p className='text-gray-400'>123 La Union St., Philippines</p>
            <p className='text-gray-400'>Email: info@launion.com</p>
            <p className='text-gray-400'>Phone: +63 123 456 789</p>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-700 pt-4 text-center'>
          <p className='text-gray-400'>
            &copy; {new Date().getFullYear()} La Union. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
