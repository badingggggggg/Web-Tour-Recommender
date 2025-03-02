import { NavItem } from 'types';

export type Post = {
  id?: number;
  category_name: string;
  title: string;
  description: string;
  location: string;
  preview_image: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Vouchers',
    url: '/dashboard/vouchers',
    icon: 'list',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Post',
    url: '/dashboard/post',
    icon: 'list',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Categories',
    url: '/dashboard/categories',
    icon: 'list',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Amenities',
    url: '/dashboard/amenities',
    icon: 'list',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: 'userPen',
        shortcut: ['m', 'm']
      }
    ]
  }
];

export const userNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/user',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Profile',
    url: '/dashboard/user/profile',
    icon: 'billing',
    isActive: true,
    items: []
  }
];
