export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type Tour = {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  location_url?: string;
};

export const popularTours: Tour[] = [
  {
    name: 'Thunderbird Resorts',
    location: 'San Fernando',
    description:
      'Poro Point is a headland located in the city of San Fernando, La Union, Philippines. It is the location of the Poro Point Freeport Zone, a special economic zone and freeport.',
    imageUrl: 'images/popular/thunderbird.png',
    location_url:
      'https://www.google.com/maps/search/?q=Thunderbird+Resorts+-+Poro+Point'
  },
  {
    name: 'Sunset Bay Beach',
    location: 'San Fernando',
    description:
      'Sunset Bay Beach is a private beach located in the city of San Fernando, La Union, Philippines. It is a popular destination for tourists and locals alike.',
    imageUrl: 'images/popular/sunset-bay.jpg',
    location_url: 'https://www.google.com/maps/search/?q=Sunset+Bay+Beach'
  },
  {
    name: 'P&M',
    location: 'San Juan',
    description:
      'P&M Final Option Beach Resort is a beachfront property located in the city of San Juan, La Union, Philippines. It is a popular destination for tourists and locals alike.',
    imageUrl: 'images/popular/p&m.jpg',
    location_url:
      'https://www.google.com/maps/search/?q=P&M+Final+Option+Beach+Resort'
  },
  {
    name: 'Kahuna Beach Resort',
    location: 'San Juan',
    description:
      'Kahuna Beach Resort is a beachfront property located in the town of San Juan, La Union, Philippines. It is a popular destination for tourists and locals alike.',
    imageUrl: 'images/popular/kahuna.jpg',
    location_url: 'https://www.google.com/maps/search/?q=Kahuna+Beach+Resort'
  },
  {
    name: 'Aureo Resort',
    location: 'San Fernando',
    description:
      'Aureo Resort is a beachfront property located in the city of San Fernando, La Union, Philippines. It is a popular destination for tourists and locals alike.',
    imageUrl: 'images/popular/aureo.jpg',
    location_url: 'https://www.google.com/maps/search/?q=Aureo+Resort'
  },
  {
    name: 'Ma-Cho Temple',
    location: 'San Fernando',
    description:
      'the Majestic Five Door Gate , which is very rare because typically chinese temple has only three archways serving as the main gate',
    imageUrl: 'images/popular/ma-cho.jpg',
    location_url: 'https://www.google.com/maps/search/?q=Ma+Cho+Temple'
  }
];
