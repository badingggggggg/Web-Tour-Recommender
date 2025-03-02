'use client';
import Quote from '@/components/quote';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '@/utils/toast';
import { LoaderCircle } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required')
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      // Attempt to sign in using the credentials
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (response?.error) {
        showToast('error', response.error);
        return;
      }

      if (response?.ok) {
        const session = await fetch('/api/auth/session').then((res) =>
          res.json()
        );
        if (session?.user?.user_type === 'Admin') {
          router.push('/dashboard/overview');
        } else {
          router.push('/dashboard/user');
        }
        showToast('success', 'Login successful');
      }
    } catch (error: any) {
      console.error('Error: ', error);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div
        style={{ backgroundImage: "url('/auth-bg.jpg')" }}
        className='relative hidden h-full flex-col bg-muted bg-cover bg-center p-10 text-white dark:border-r lg:flex'
      >
        <div className='absolute inset-0 bg-zinc-900/50' />
        <div className='relative z-20 mt-auto'>
          <Quote />
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Sign in to your account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to sign in to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='email@example.com' {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className='w-full'>
                {isLoading && (
                  <LoaderCircle className='mr-2 size-4 animate-spin' />
                )}
                Login
              </Button>
            </form>
          </Form>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p className='text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/signup'
              className='text-blue-500 underline underline-offset-4'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
