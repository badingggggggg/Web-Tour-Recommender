'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { ContactType } from 'types/contact';
import { useForm } from 'react-hook-form';
import { useSendContact } from '@/hooks/use-contact';
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactType>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });
  const sendContact = useSendContact();

  const onSubmit = async (values: ContactType) => {
    try {
      await sendContact.mutateAsync(values);
      reset();
    } catch (error) {
      console.error('Error during message creation', error);
    }
  };
  return (
    <section className='min-h-screen py-12 text-gray-900'>
      <div className='mx-auto mt-28 max-w-7xl px-4'>
        <h1 className='mb-8 text-center text-4xl font-bold text-orange-300'>
          Contact Us
        </h1>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Contact Form */}
          <div>
            <h2 className='mb-4 text-2xl font-semibold'>Send Us a Message</h2>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor='name' className='block text-sm font-medium'>
                  Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  {...register('name', {
                    required: 'Name is required'
                  })}
                  placeholder='Enter your name'
                  className='mt-2 w-full rounded-lg border border-gray-300 p-3'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor='email' className='block text-sm font-medium'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  {...register('email', {
                    required: 'Email is required'
                  })}
                  placeholder='Enter your email'
                  className='mt-2 w-full rounded-lg border border-gray-300 p-3'
                />

                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor='message' className='block text-sm font-medium'>
                  Message
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  {...register('message', {
                    required: 'Message is required'
                  })}
                  placeholder='Enter your message'
                  className='mt-2 w-full rounded-lg border border-gray-300 p-3'
                />
                {errors.message && (
                  <p className='text-xs text-red-500'>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold transition hover:bg-blue-600'
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className='mb-4 text-2xl font-semibold'>
              Our Contact Information
            </h2>
            <p className='mb-4 text-lg'>
              Reach out to us for any inquiries or support. We&apos;re here to
              assist you.
            </p>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-medium'>Address</h3>
                <p>123 La Union St., Philippines</p>
              </div>

              <div>
                <h3 className='text-lg font-medium'>Email</h3>
                <p>info@launion.com</p>
              </div>

              <div>
                <h3 className='text-lg font-medium'>Phone</h3>
                <p>+63 123 456 789</p>
              </div>

              <div>
                <h3 className='text-lg font-medium'>Follow Us</h3>
                <ul className='flex space-x-4'>
                  <li>
                    <a
                      href='https://facebook.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:text-blue-600'
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://instagram.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-pink-500 hover:text-pink-600'
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://twitter.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-400 hover:text-blue-500'
                    >
                      <FaTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
