'use client';
import { Icons } from '@/components/icons';
import Quote from '@/components/quote';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { useCreateUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is required and must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  full_name: z.string().min(8, 'Full name must be at least 8 characters long.'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits.')
});

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      full_name: '',
      phone: ''
    }
  });

  const createUser = useCreateUser();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createUser.mutateAsync(data as any);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during user creation', error);
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
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your credentials below to create your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter username...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter email...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter password...'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter full name...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter phone...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-5'>
                <Button
                  className='w-full'
                  variant='default'
                  type='submit'
                  disabled={form.formState.isSubmitting}
                >
                  <Icons.check className='mr-2 h-4 w-4' />
                  {form.formState.isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </div>
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
            Already have an account?{' '}
            <Link
              href='/auth/login'
              className='text-blue-500 underline underline-offset-4'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
