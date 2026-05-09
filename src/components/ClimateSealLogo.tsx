import React from 'react';
import Image from 'next/image';

const ClimateSealLogo = () => {
  return (
    <div className="flex items-center gap-1.5 text-white sm:gap-2">
      <Image
        src="/favicon.png"
        alt="Climate Seal emblem"
        width={68}
        height={68}
        className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
        priority
      />
      <div className="h-8 w-px bg-white/70 sm:h-9 md:h-10" />
      <div className="flex flex-col justify-center leading-none">
        <span className="font-source-sans text-[0.82rem] font-semibold tracking-[0.14em] uppercase sm:text-[0.95rem] md:text-[1rem]">
          Climate Seal
        </span>
        <span className="mt-0.5 h-px w-full bg-white/80" />
        <span className="mt-1 font-source-sans text-[6px] font-medium tracking-[0.08em] text-white/88 sm:text-[7px] md:text-[7.5px]">
          Credibility Drives Better Climate.
        </span>
      </div>
    </div>
  );
};

export default ClimateSealLogo;
