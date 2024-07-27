'use client' 
 
import { ButtonLink } from '@/components/button'
import { useEffect } from 'react'
 
export default function TrackErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="my-10  px-4">
      <div className="text-center">
        <p className="my-4 text-2xl font-bold tracking-tight sm:text-4xl">
          Uh-oh!
        </p>

        <p className="my-4">Something went wrong</p>
        <p className="my-4">{error?.message}</p>
        <ButtonLink onClick={() => reset()}>Retry</ButtonLink>
      </div>
    </div>
  );
}