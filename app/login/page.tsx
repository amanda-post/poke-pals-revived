'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { TextLogo } from '~/components/ui/icons';
import { Input } from '~/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

export default function Login() {
  const router = useRouter();
  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <TextLogo className='w-60 mb-5' />
      <Input placeholder='Username' className='mt-6 mb-4 w-4/12' />
      <Input placeholder='Password' type='password' className='m-4 w-4/12' />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='mt-8 mb-1 w-4/12'>
              <Button variant='outline' disabled={true} className='w-full'>
                Log In
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Temporarily unavailable, please use Github login!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='mb-1 w-4/12'>
              <Button
                className='w-full'
                variant='outline'
                disabled={true}
                onClick={() => signIn('google')}
              >
                Sign in with Google
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Temporarily unavailable, please use Github login!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        variant='outline'
        className='mb-1 w-4/12'
        onClick={() => signIn('github')}
      >
        Sign In with GitHub
      </Button>

      <Button variant='link' className='w-4/12'>
        Forgot Password?
      </Button>
    </main>
  );
}
