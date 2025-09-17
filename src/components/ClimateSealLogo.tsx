import React from 'react';
import Image from 'next/image';

const ClimateSealLogo = () => {
  return (
    <div className="flex items-center">
      <Image 
        src="/company-logo.png" 
        alt="Climate Seal Logo" 
        width={320}
        height={100}
        className="h-12 sm:h-16 md:h-20 w-auto max-w-[200px] sm:max-w-[280px] md:max-w-[320px]"
        priority
      />
    </div>
  );
};

export default ClimateSealLogo;