import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { TextLogo } from '~/components/ui/icons';
import { Input } from '~/components/ui/input';

export default function Home() {
  const router = useRouter();
  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <TextLogo className='w-60 mb-5' />
      <Input placeholder='Username' className='mt-6 mb-4 w-4/12' />
      <Input placeholder='Password' type='password' className='m-4 w-4/12' />

      <Button
        variant='outline'
        className='mt-8 mb-1 w-4/12'
        onClick={goToDashboard}
      >
        Log In
      </Button>

      <Button variant='link' className='w-4/12'>
        Forgot Password?
      </Button>
    </main>
  );
}
