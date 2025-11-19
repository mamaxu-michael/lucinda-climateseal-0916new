"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Item = {
  title: string;
  summary: string;
  details?: string[];
  gradient?: string;
  background?: string;
  mediaSrc?: string;
  staticMediaSrc?: string;
  dynamicMediaSrc?: string;
};

function AutoVideo({ 
  src, 
  className, 
  fallbackSrc 
}: { 
  src: string; 
  className?: string; 
  fallbackSrc?: string 
}) {
  const [ref, setRef] = useState<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.play().catch(() => {});
      } else {
        ref.pause();
      }
    }, { threshold: 0.3 });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);

  const handleError = () => {
    setHasError(true);
  };

  // If video fails and we have a fallback image, show that
  if (hasError && fallbackSrc) {
    return (
      <figure className="m-0">
        <img
          src={fallbackSrc}
          className={className}
          alt="AI agent demo"
          style={{
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
        <figcaption className="sr-only">AI agent demo image</figcaption>
      </figure>
    );
  }

  return (
    <figure className="m-0">
      <video
        ref={setRef}
        src={src}
        className={className}
        title="AI agent demo video"
        autoPlay
        muted
        loop
        playsInline
        onError={handleError}
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
      <figcaption className="sr-only">AI agent demo video</figcaption>
    </figure>
  );
}

export default function VideoTextLayout({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.2, 0.8, 0.2, 1] as const
      } 
    },
  };

  return (
    <div className={`space-y-16 md:space-y-24 ${className}`}>
      {items.map((item, index) => {
        // Use dynamic video if available, otherwise fall back to static image or media
        const videoSrc = item.dynamicMediaSrc || item.mediaSrc;
        const fallbackSrc = item.staticMediaSrc;
        const isVideo = videoSrc?.endsWith(".mp4");

        return (
          <motion.div
            key={item.title + index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            {/* Video/Media Section - Left Side */}
            <div className="w-full md:w-[55%] lg:w-[50%] flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.25)]">
                {isVideo && videoSrc ? (
                  <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                    <AutoVideo 
                      src={videoSrc} 
                      fallbackSrc={fallbackSrc}
                      className="w-full h-full" 
                    />
                  </div>
                ) : fallbackSrc ? (
                  <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                    <img 
                      src={fallbackSrc} 
                      alt={item.title} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                ) : (
                  <div className={`w-full aspect-video ${item.background ?? 'bg-gradient-to-br from-neutral-900 to-neutral-800'}`} />
                )}
                
                {/* Gradient overlay */}
                {item.gradient && (
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}
                  />
                )}
              </div>
            </div>

            {/* Text Content Section - Right Side */}
            <div className="w-full md:w-[45%] lg:w-[50%] flex flex-col justify-center space-y-4">
              <motion.h3 
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] font-lora"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {item.title}
              </motion.h3>
              
              <motion.p 
                className="text-lg md:text-xl text-[#666666] leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {item.summary}
              </motion.p>

              {/* Additional details if available */}
              {item.details && item.details.length > 0 && (
                <motion.ul 
                  className="space-y-2 mt-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#666666]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#666666] flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

