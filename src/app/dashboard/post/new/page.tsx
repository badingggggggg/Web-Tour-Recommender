'use client';

import axiosInstance from '@/app/axios/axios';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAmenities } from '@/hooks/use-amenities';
import { useCategories } from '@/hooks/use-category';
import { useCreatePost } from '@/hooks/use-post';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectLabel } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Define form validation schema using Zod
const formSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length > 0, 'At least one image is required.')
    .refine(
      (files) => files.every((file: any) => file.size <= MAX_FILE_SIZE),
      `Each file must be 5MB or less.`
    )
    .refine(
      (files) =>
        files.every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png, and .webp files are accepted.'
    ),
  category_id: z.number().min(1, 'Category is required.').nullable(),
  title: z
    .string()
    .min(3, 'Title is required and must be at least 3 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  location: z.string().min(3, 'Location must be at least 3 characters long.'),
  preview_image: z.string().optional(),
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

export default function PostForm() {
  const { data: amenities, isLoading } = useAmenities(1);
  const { data: categories } = useCategories(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      category_id: null,
      title: '',
      description: '',
      location: '',
      preview_image: '',
      price: 0,
      price_per_night: 0,
      price_currency: 'PHP',
      seasonal_price: 0,
      discount_price: 0
    }
  });

  const { setValue, watch } = form;
  const selectedAmenities = watch('amenities') || [];

  const toggleAmenity = (id: number) => {
    setValue(
      'amenities',
      selectedAmenities.includes(id)
        ? selectedAmenities.filter((amenityId) => amenityId !== id)
        : [...selectedAmenities, id]
    );
  };

  const createPost = useCreatePost();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData: any = new FormData();
      for (const key in data) {
        if (key !== 'images') {
          formData.append(key, data[key as keyof typeof data] as string | Blob);
        }
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach((file: File) => {
          if (file) {
            formData.append('images', file);
          }
        });
      }

      const postResponse = await createPost.mutateAsync(formData);

      if (postResponse?.insertId && data.amenities.length > 0) {
        await axiosInstance.post('/api/post/amenities', {
          post_id: postResponse.insertId,
          amenity_ids: data.amenities
        });
      }
    } catch (error) {
      console.error('Error during category creation', error);
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Add New Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={4}
                      maxSize={MAX_FILE_SIZE}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <div>
                <label className='mb-2 block font-semibold'>Amenities</label>
                {isLoading ? (
                  <p>Loading amenities...</p>
                ) : (
                  <div className='grid grid-cols-2 gap-2'>
                    {amenities.items.map((amenity) => (
                      <label
                        key={amenity.id}
                        className='flex items-center space-x-2'
                      >
                        <input
                          type='checkbox'
                          value={amenity.id}
                          checked={selectedAmenities.includes(amenity.id)}
                          onChange={() => toggleAmenity(amenity.id)}
                          className='form-checkbox'
                        />
                        <span>{amenity.amenity_name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
