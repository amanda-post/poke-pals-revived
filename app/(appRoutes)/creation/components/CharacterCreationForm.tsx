'use client';
import React from 'react';

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

type FormSchema = {
  username: string;
};

const validateUsername = async (username: string) => {
  const res = await fetch(`/api/username/${username}`);

  const regex = /^[a-zA-Z0-9-_]*$/;
  if (regex.test(username) === false) {
    return 'Username can only contain letters, numbers, dashes, and underscores';
  }

  const { available } = await res.json();
  if (!available) {
    return 'Username is already taken';
  }

  return true;
};

const CharacterCreationForm: React.FC = () => {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          rules={{ validate: validateUsername }}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default CharacterCreationForm;
