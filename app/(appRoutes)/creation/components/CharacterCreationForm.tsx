'use client';
import axios from 'axios';
import React from 'react';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '~/components/ui/use-toast';

type FormSchema = {
  username: string;
};

const validateUsername = async (username: string) => {
  const regex = /^[a-zA-Z0-9-_.]{3,}$/;
  if (regex.test(username) === false) {
    return 'Username must be a minimum length of 3 and only contain: letters, numbers, -, _, and .';
  }

  const response = await fetch(`/api/user/username/${username}`);
  const usernameMatch = await response.json();
  if (usernameMatch) {
    return 'Username is already taken';
  }

  return true;
};

const CharacterCreationForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data, update } = useSession();

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: FormSchema) {
    axios
      .patch(`/api/user/${data?.user?.id || ''}`, {
        data: {
          username: values.username,
        },
      })
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Your username has been updated.',
          duration: 5000,
        });

        router.push('/dashboard');

        update((prev: Session) => ({
          ...prev,
          user: {
            ...prev.user,
            username: values.username,
          },
        }));
      })
      .catch((error) => {
        toast({
          title: 'Error!',
          description: error.message,
          variant: 'destructive',
          duration: 5000,
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='TrainerAmanda123' {...field} />
              </FormControl>

              {form.formState.errors?.username ? (
                <FormMessage className='text-xs'>
                  form.formState.errors.username.message
                </FormMessage>
              ) : (
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              )}
            </FormItem>
          )}
          rules={{ validate: validateUsername }}
        />
        <Button type='submit' disabled={!!form.formState.errors?.username}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CharacterCreationForm;
