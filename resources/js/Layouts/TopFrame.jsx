import React from 'react';

const TopFrame = ({ children }) => {

  return (
    <div class="min-h-screen flex flex-col">
      {children}
    </div>
  )
}

export default TopFrame;