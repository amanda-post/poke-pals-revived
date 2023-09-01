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
import { validUsernameRegex } from '~/lib/utils/constants';
import { usernameExists } from '~/lib/utils/generalHelpers';

type AddFriendSchema = {
  username: string;
};

const validateUsername = async (username: string) => {
  if (validUsernameRegex.test(username) === false) {
    return 'Usernames are a minimum length of 3 and only contain: letters, numbers, -, _, and .';
  }

  const usernameMatch = await usernameExists(username);
  if (!usernameMatch) {
    return 'Username does not exist';
  }

  return true;
};

const AddFriend = () => {
  const { toast } = useToast();

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: AddFriendSchema) {
    sendFriendRequest(values.username)
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Type username here...' {...field} />
                </FormControl>

                <FormMessage
                  className={`text-xs ${
                    form.formState.errors?.username ? 'opacity-1' : 'opacity-0'
                  }`}
                >
                  {form.formState.errors?.username
                    ? form.formState.errors.username.message
                    : 'hidden_placeholder'}
                </FormMessage>
              </FormItem>
            )}
            rules={{ validate: validateUsername }}
          />
          <Button
            variant='secondary'
            type='submit'
            disabled={!!form.formState.errors?.username}
          >
            Add Friend
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddFriend;
