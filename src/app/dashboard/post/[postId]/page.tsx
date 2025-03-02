'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAmenities } from '@/hooks/use-amenities';
import { useCategories } from '@/hooks/use-category';
import { usePost, useUpdatePost } from '@/hooks/use-post';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectLabel } from '@radix-ui/react-select';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define form validation schema using Zod
const formSchema = z.object({
  category_id: z.number().min(1, 'Category is required.').nullable(),
  title: z
    .string()
    .min(3, 'Title is required and must be at least 3 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  location: z.string().min(3, 'Location must be at least 3 characters long.'),
  price: z.coerce.number().min(1, 'Price must be at least 1.'),
  price_per_night: z.coerce
    .number()
    .min(0, 'Price per night must be 0 or more.'),
  price_currency: z.string().default('PHP'),
  seasonal_price: z.coerce.number().min(0, 'Seasonal price must be 0 or more.'),
  discount_price: z.coerce.number().min(0, 'Discount price must be 0 or more.'),
  amenities: z
    .array(z.number())
    .min(1, 'At least one amenity must be selected.')
});

export default function UpdatePost() {
  const { data: amenities, isLoading } = useAmenities(1);
  const { postId } = useParams();
  const { data: post } = usePost(Number(postId));
  const { data: categories } = useCategories(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_id: null,
      title: '',
      description: '',
      location: '',
      price: 0,
      price_per_night: 0,
      price_currency: 'PHP',
      seasonal_price: 0,
      discount_price: 0
    }
  });

  const { setValue, watch } = form;

  useEffect(() => {
    if (post) {
      setValue('category_id', post.category_id);
      setValue('title', post.title);
      setValue('description', post.description);
      setValue('location', post.location);
      setValue('price', post.price);
      setValue('price_per_night', post.price_per_night);
      setValue('price_currency', post.price_currency);
      setValue('seasonal_price', post.seasonal_price);
      setValue('discount_price', post.discount_price);
      setValue('amenities', post.amenities?.map((a: any) => a.id) || []);
    }
  }, [post, setValue]);

  const { mutateAsync: updatedPost } = useUpdatePost();

  const onSubmit = async (values: any) => {
    try {
      await updatedPost({
        id: Number(postId),
        updatedPost: values
      });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Update Post' description='Edit post details' />
        </div>
        <Separator />
        {post?.images && post.images.length > 0 && (
          <div className='flex items-center gap-3'>
            {post.images.map((image, index) => (
              <div key={index} className='flex justify-center'>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  className='h-64 w-64 object-cover'
                  width={256}
                  height={256}
                />
              </div>
            ))}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Input Fields */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='category_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select Category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categories?.items.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.category_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter title...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder='Enter description...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter location...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        placeholder='Enter price...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Per Night */}
              <FormField
                control={form.control}
                name='price_per_night'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Per Night</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        placeholder='Enter price per night...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Currency */}
              <FormField
                control={form.control}
                name='price_currency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Currency</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select currency' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='PHP'>PHP</SelectItem>
                        <SelectItem value='USD'>USD</SelectItem>
                        <SelectItem value='EUR'>EUR</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seasonal Price */}
              <FormField
                control={form.control}
                name='seasonal_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seasonal Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        placeholder='Enter seasonal price...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount Price */}
              <FormField
                control={form.control}
                name='discount_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        placeholder='Enter discount price...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amenities'
                render={() => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <div className='grid grid-cols-2 gap-2'>
                      {amenities?.items.map((amenity) => {
                        const selectedAmenities = watch('amenities') || [];

                        return (
                          <FormControl key={amenity.id}>
                            <label className='flex items-center gap-2'>
                              <input
                                type='checkbox'
                                checked={selectedAmenities.includes(amenity.id)}
                                onChange={() =>
                                  setValue(
                                    'amenities',
                                    selectedAmenities.includes(amenity.id)
                                      ? selectedAmenities.filter(
                                          (id) => id !== amenity.id
                                        )
                                      : [...selectedAmenities, amenity.id]
                                  )
                                }
                                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                              />
                              <span className='text-sm text-white'>
                                {amenity.amenity_name}
                              </span>
                            </label>
                          </FormControl>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
