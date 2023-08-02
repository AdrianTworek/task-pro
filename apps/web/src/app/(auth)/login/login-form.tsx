'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
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
  useToast,
} from 'ui';
import SocialProviders from '../social-providers';

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

  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onCredentialsSubmit = async (values: LoginSchema) => {
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
      return;
    }

    router.push('/dashboard');
  };

  return (
    <Card className="py-8 px-6 space-y-6 drop-shadow-md">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center">
        Sign in with
      </h2>

      <SocialProviders />

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
                  <Input placeholder="example@test.com" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
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