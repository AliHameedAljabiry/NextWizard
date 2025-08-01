import React from 'react'

const TooFast = () => {
  return (
    <main className='root-container flex min-h-secreen flex-col items-center justify-center'>
      <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Whoa, Slow Down There, Speedy!</h1>
      <p className=' nt-3 max-w-xl text-center  text-light-400'>
        Looks like you&apos;ve been a little too quick! Please wait a moment before trying again.
      </p>
    </main>
  )
}

export default TooFast