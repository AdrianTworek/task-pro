'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
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
import { useState } from 'react';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please provide a valid email address')
    .max(254, 'Email cannot contain more than 254 characters')
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1, 'Password is required'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onCredentialsSubmit = async (values: LoginSchema) => {
    setLoggingIn(true);
    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    if (res?.error) {
      toast({
        variant: 'destructive',
        title: 'Invalid credentials!',
        description: 'Please try again',
      });
      setLoggingIn(false);
      return;
    }

    setLoggingIn(false);
    router.push('/dashboard');
  };

  return (
    <Card className="py-8 px-6 space-y-6 drop-shadow-md">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center">
        Sign in with
      </h2>

      <SocialProviders loading={loggingIn} />

      <span className="block text-center">or</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCredentialsSubmit)}
          className="flex flex-col flex-1 space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={loggingIn}
                    placeholder="example@test.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={loggingIn} type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton disabled={loggingIn}>Login</SubmitButton>
        </form>
      </Form>

      <div className="self-center mt-4">
        <p>
          Not signed up?{' '}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </Card>
  );
}
