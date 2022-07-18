import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <div class='w-full p-4 bg-[#333] flex text-4xl font-bold text-[#fcbd1a]'>
      <FontAwesomeIcon icon="bicycle" />
      <div class='ml-4'>CityBike App</div>
    </div>
  )
}

export default Header;