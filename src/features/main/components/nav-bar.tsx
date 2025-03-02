'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

interface MobileNavItemProps {
  href: string;
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const link = [
  { href: '/', children: 'Home' },
  { href: '/map', children: 'Map' },
  { href: '/wheretogo', children: 'Where To Go' },
  { href: '/about', children: 'About' },
  { href: '/contact', children: 'Contact' }
];

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 text-lg font-medium ${
        isActive ? 'text-orange-500' : 'text-gray-900'
      } hover:text-orange-300`}
    >
      <span>{children}</span>
    </Link>
  );
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  href,
  children,
  setIsOpen
}) => (
  <Link
    href={href}
    className='block px-4 py-2 font-medium text-gray-900 hover:text-orange-300'
    onClick={() => setIsOpen(false)}
  >
    <div className='flex items-center space-x-2'>
      <span>{children}</span>
    </div>
  </Link>
);

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 bg-white bg-none p-4'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <div className='flex items-center gap-5'>
          <Link href='/'>
            <Image src='/logo.png' alt='Logo' width={150} height={150} />
          </Link>

          {/* Desktop Menu */}
          <div className='hidden space-x-6 text-lg md:flex'>
            {link.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>
        </div>
        {/* Search and Sign Up */}
        <div className='flex items-center space-x-4'>
          <Link href='/search'>
            <Search />
          </Link>
          <Link href='/auth/login'>
            <Button>Sign in</Button>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          size='icon'
          className='text-black md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='mt-4 space-y-2 md:hidden'>
          {link.map((item, index) => (
            <MobileNavItem key={index} {...item} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
