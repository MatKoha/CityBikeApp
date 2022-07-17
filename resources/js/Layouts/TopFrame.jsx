import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const TopFrame = ({ children }) => {

  return (
    <div class="min-h-screen flex flex-col justify-between">
      <Header />
      <div class="flex-1 bg-[#fcbd1a]">{children}</div>
      <Footer />
    </div>
  )
}

export default TopFrame;