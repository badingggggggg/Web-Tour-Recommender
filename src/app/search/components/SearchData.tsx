'use client';
import { useSearchPost } from '@/hooks/use-post';
import { Search as SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import ImageCard from '@/components/image-card';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const { data, isLoading, error } = useSearchPost(query, 1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  if (error) return <p className='text-center text-red-500'>Failed to load.</p>;

  return (
    <div className='mx-auto mt-12 max-w-7xl'>
      <form onSubmit={handleSubmit} className='relative mx-auto flex max-w-2xl'>
        <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='What are you looking for?'
          className='w-full rounded bg-gray-400 bg-opacity-20 bg-clip-padding p-3 outline-none backdrop-blur-none backdrop-filter md:p-5'
        />
        <button type='submit' className='absolute right-5 top-3 md:top-5'>
          <SearchIcon className='cursor-pointer text-gray-600 hover:text-gray-800' />
        </button>
      </form>

      {isLoading ? (
        <p className='mt-5 text-center'>Loading...</p>
      ) : (
        <section className='py-12'>
          {query.trim() && data && data?.total_items > 0 && (
            <h2 className='mb-2 px-4 text-xs text-gray-500'>
              Total results found: {data.total_items}
            </h2>
          )}

          <div className='mx-auto max-w-7xl px-4'>
            {query.trim() && data?.total_items === 0 && (
              <p className='text-center text-gray-500'>No results found.</p>
            )}

            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
              {data?.items.map((item) => (
                <ImageCard
                  key={item.id}
                  name={item.title}
                  description={item.description}
                  imageUrl={item.image_url as any}
                  location_url={`https://www.google.com/maps/search/?q=${encodeURIComponent(item.title)}`}
                  price={Number(item.price)}
                  price_currency={item.price_currency}
                  rating={item.rating || 4.5}
                  viewUrl={`/wheretogo/${item.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
