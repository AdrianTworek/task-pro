'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SubmitButton,
  useToast,
} from 'ui';
import SocialProviders from '../social-providers';
import { registerAction } from '@/server/auth/auth.actions';
import { useTransition } from 'react';
import {
  registerWithCredentialsSchema,
  RegisterWithCredentialsBody,
} from '@/server/auth/auth.schema';
import { signIn } from 'next-auth/react';
import { isCommonErrorResponse } from '@/server/types/errors';

export default function RegisterForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<RegisterWithCredentialsBody>({
    resolver: zodResolver(registerWithCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onCredentialsSubmit = async (values: RegisterWithCredentialsBody) => {
    startTransition(async () => {
      const res = await registerAction(values);
      if (isCommonErrorResponse(res)) {
        toast({
          variant: 'destructive',
          title: 'Oh! Something went wrong',
          description: res.error.message,
        });
        return;
      }

      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      toast({
        title: 'Successfully registered!',
        description: 'Welcome to Task-Pro!',
      });
      router.push('/dashboard');
    });
  };

  return (
    <Card className='py-8 px-6 space-y-6 drop-shadow-md'>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight text-center'>
        Sign up with
      </h2>

      <SocialProviders loading={isPending} />

      <span className='block text-center'>or</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCredentialsSubmit)}
          className='flex flex-col flex-1 space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder='example@test.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton disabled={isPending}>Register</SubmitButton>
        </form>
      </Form>

      <div className='self-center mt-4'>
        <p>
          Already registered?{' '}
          <Link href='/login' className='underline'>
            Login
          </Link>
        </p>
      </div>
    </Card>
  );
}
