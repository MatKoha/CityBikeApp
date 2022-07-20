import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react'

const Header = () => {
  return (
    <div class='w-full bg-[#333]'>
      <Link href="/" class="p-6 inline-flex text-4xl font-bold text-[#fcbd1a]">
        <FontAwesomeIcon icon="bicycle" />
        <div class='ml-4'>CityBike App</div>
      </Link>
    </div>
  )
}

export default Header;