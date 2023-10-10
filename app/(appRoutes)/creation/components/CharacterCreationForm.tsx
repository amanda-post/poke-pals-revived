'use client';
import axios from 'axios';
import React from 'react';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';
import { validPlayerAliasRegex } from '~/lib/utils/constants';
import { playerAliasExists } from '~/lib/utils/generalHelpers';

type FormSchema = {
  playerAlias: string;
};

const validatePlayerAlias = async (playerAlias: string) => {
  if (validPlayerAliasRegex.test(playerAlias) === false) {
    return 'Trainer name must be a minimum length of 3 and only contain: letters, numbers, -, _, and .';
  }

  const playerAliasMatchFound = await playerAliasExists(playerAlias);
  if (playerAliasMatchFound) {
    return 'Trainer name is already taken';
  }

  return true;
};

const CharacterCreationForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data, update } = useSession();

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      playerAlias: '',
    },
  });

  function onSubmit(values: FormSchema) {
    axios
      .patch(`/api/user/${data?.user?.id || ''}`, {
        data: {
          playerAlias: values.playerAlias,
        },
      })
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Your trainer name has been updated.',
          duration: 5000,
        });

        router.push('/dashboard');

        update((prev: Session) => ({
          ...prev,
          user: {
            ...prev.user,
            playerAlias: values.playerAlias,
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
          name='playerAlias'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trainer Name</FormLabel>
              <FormControl>
                <Input placeholder='TrainerAmanda123' {...field} />
              </FormControl>

              {form.formState.errors?.playerAlias ? (
                <FormMessage className='text-xs'>
                  form.formState.errors.playerAlias.message
                </FormMessage>
              ) : (
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              )}
            </FormItem>
          )}
          rules={{ validate: validatePlayerAlias }}
        />
        <Button type='submit' disabled={!!form.formState.errors?.playerAlias}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CharacterCreationForm;
