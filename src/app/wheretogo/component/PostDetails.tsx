'use client';

import { usePost } from '@/hooks/use-post';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { LoadingSpinner } from '@/components/common/Loader';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateReview } from '@/hooks/use-review';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  post_id: z.number().min(1, 'Post ID is required'),
  rating: z.number().min(1, 'Rating is required'),
  comment: z.string().min(1, 'Comment is required')
});

const PostDetails = () => {
  const { postId } = useParams();
  const { data: post, isLoading, error } = usePost(Number(postId));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_id: Number(postId),
      rating: 0,
      comment: ''
    }
  });

  const createReview = useCreateReview();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createReview.mutateAsync(data as any);
      form.reset({ post_id: Number(postId), rating: 0, comment: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error during amenity creation', error);
    }
  };

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
      </div>

      {/* Reviews Section */}
      <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md'>
        <h2 className='text-sm font-medium text-gray-700'>Reviews</h2>
        {post.reviews.map((review) => (
          <div key={review.id} className='border-t pt-4'>
            <p className='text-sm font-semibold text-gray-800'>
              {review.full_name}
            </p>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <p className='mt-1 text-sm text-gray-600'>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Add Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {session && (
            <DialogTrigger asChild>
              <Button className='mt-4'>Add Review</Button>
            </DialogTrigger>
          )}
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Add Your Review</DialogTitle>
            <DialogDescription>
              Share your experience and rate this post.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Star Rating */}
            <div className='flex items-center space-x-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => form.setValue('rating', star)}
                  className={`cursor-pointer transition-transform ${
                    star <= form.watch('rating')
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              {form.formState.errors.rating && (
                <p className='text-xs text-red-500'>
                  {form.formState.errors.rating.message}
                </p>
              )}
            </div>

            {/* Comment Input */}
            <div className='grid gap-2'>
              <Label htmlFor='comment'>Comment</Label>
              <Input
                id='comment'
                {...form.register('comment')}
                placeholder='Write your thoughts...'
              />
              {form.formState.errors.comment && (
                <p className='text-xs text-red-500'>
                  {form.formState.errors.comment.message}
                </p>
              )}
            </div>

            {/* Hidden post_id (already set in defaultValues, just keep it) */}
            <input type='hidden' {...form.register('post_id')} />

            <DialogFooter className='mt-4'>
              <Button type='submit'>
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDetails;
