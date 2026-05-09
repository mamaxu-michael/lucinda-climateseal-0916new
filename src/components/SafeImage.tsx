'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/logo.jpg',
  onError,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={currentSrc || fallbackSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
