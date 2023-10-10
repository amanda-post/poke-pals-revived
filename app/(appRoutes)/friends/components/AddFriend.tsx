'use client';

import { useForm } from 'react-hook-form';

import { sendFriendRequest } from '~/app/(appRoutes)/friends/actions';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';
import { validPlayerAliasRegex } from '~/lib/utils/constants';
import { playerAliasExists } from '~/lib/utils/generalHelpers';

type AddFriendSchema = {
  playerAlias: string;
};

const validatePlayerAlias = async (playerAlias: string) => {
  if (validPlayerAliasRegex.test(playerAlias) === false) {
    return 'Trainer names are a minimum length of 3 and only contain: letters, numbers, -, _, and .';
  }

  const playerAliasMatchFound = await playerAliasExists(playerAlias);
  if (!playerAliasMatchFound) {
    return 'Trainer name does not exist';
  }

  return true;
};

const AddFriend = () => {
  const { toast } = useToast();

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      playerAlias: '',
    },
  });

  function onSubmit(values: AddFriendSchema) {
    sendFriendRequest(values.playerAlias)
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Friend request sent!',
          duration: 5000,
        });
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
        <div className='flex'>
          <FormField
            control={form.control}
            name='playerAlias'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Type playerAlias here...' {...field} />
                </FormControl>

                <FormMessage
                  className={`text-xs ${
                    form.formState.errors?.playerAlias
                      ? 'opacity-1'
                      : 'opacity-0'
                  }`}
                >
                  {form.formState.errors?.playerAlias
                    ? form.formState.errors.playerAlias.message
                    : 'hidden_placeholder'}
                </FormMessage>
              </FormItem>
            )}
            rules={{ validate: validatePlayerAlias }}
          />
          <Button
            variant='secondary'
            type='submit'
            disabled={!!form.formState.errors?.playerAlias}
          >
            Add Friend
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddFriend;
