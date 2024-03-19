import { SignIn } from '@clerk/nextjs';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col gap-10'>
      <h1 className='text-4xl font-bold mt-20'>This is signin page</h1>
      {/* <Suspense fallback={<div className='w-1/2 h-full flex justify-center items-center'><Loader2Icon className='h-6 w-6 animate-spin'/></div>}> */}
      <SignIn />
      {/* </Suspense> */}
    </div>
  );
}