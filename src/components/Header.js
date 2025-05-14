'use client';

import Image from "next/image";
import React from 'react';

const Header = () => {
  return (
    <div style={{ backgroundColor: '#00008B', padding: '10px', textAlign: 'center' }}>
      <Image
        src="https://firmoconsultoria.com.br/inbm/Inbm_02_logo.svg"
        alt="Application Logo"
        width={200}
        height={100}
        style={{ objectFit: 'contain', width: 'auto' }}
        priority
      />
    </div>
  );
};

export default Header;