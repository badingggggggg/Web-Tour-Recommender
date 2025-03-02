import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_SERPAPI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }

    const { data } = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_maps',
        q: 'Tourist Spots in La Union, Resorts',
        hl: 'en',
        type: 'search',
        api_key: apiKey,
        limit: 100
      }
    });

    const resorts =
      data.local_results?.map((place: any) => ({
        id: place.place_id,
        title: place.title,
        lat: place.gps_coordinates?.latitude,
        lon: place.gps_coordinates?.longitude,
        thumbnail: place.thumbnail || '/images/default.jpg',
        link: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
        rating: place.rating || 0,
        photos_link: place.photos_link || ''
      })) || [];

    return NextResponse.json(resorts);
  } catch (error) {
    console.error('SerpApi Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}
