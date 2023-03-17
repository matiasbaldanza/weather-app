import React from 'react'

function Header({ location }) {
  return (
    <header className='flex flex-col justify-end h-40 px-4'>
        <h1 
        className='text-4xl font-bold truncate'
        >{location.name}
        </h1>
        <p className='block text-2xl italic font-normal truncate'
        >{location.region}, {location.country}</p>
    </header>
  )
}

export default Header