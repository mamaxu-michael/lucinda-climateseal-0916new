"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  title: string;
  summary: string;
  details?: string[];
  gradient?: string;     // Tailwind 渐变，如 "from-fuchsia-500 to-violet-500"
  background?: string;   // 卡片背景色渐变
  mediaSrc?: string;     // 可选：/public 下图片或 mp4
  staticMediaSrc?: string;  // 静态状态显示的媒体
  dynamicMediaSrc?: string; // 激活状态显示的媒体
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return reduced;
}

function AutoVideo({ src, className, fallbackSrc }: { src: string; className?: string; fallbackSrc?: string }) {
  const [ref, setRef] = useState<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    // 预加载视频元数据，确保快速播放
    ref.preload = 'metadata';
    
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // 立即播放，不等待
        ref.currentTime = 0;
        ref.play().catch(() => {});
      } else {
        ref.pause();
      }
    }, { 
      threshold: 0.1, // 降低阈值，元素10%进入视口就播放
      rootMargin: '50px' // 提前50px开始检测
    });
    
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);

  const handleError = () => {
    setHasError(true);
  };

  // 如果视频加载失败且有备选图片，显示图片
  if (hasError && fallbackSrc) {
    return (
      <figure className="m-0">
        <img
          src={fallbackSrc}
          className={className}
          alt="AI agent demo"
          style={{
            objectFit: 'cover',
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
        muted
        loop
        playsInline
        preload="auto"
        onError={handleError}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <figcaption className="sr-only">Short demo of automated modeling and one‑click report generation.</figcaption>
    </figure>
  );
}

export default function ExpandableCards({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  // 触摸设备：改为点击展开
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints > 0;
  }, []);

  // reveal 动效 token
  const reveal = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as const } },
  };

  return (
    <motion.div
      layout
      className={`mx-auto max-w-[1450px] px-6 ${className}`}
    >
      <div
        className="flex justify-center gap-6 overflow-x-auto"
        // 为了更平滑的布局变化，外层也可换成 motion.div layout
      >
        {items.map((it, i) => {
          const isActive = active === i;
          // 激活时放大 flex-basis；否则为常规宽度
          const base = "basis-[295px] md:basis-[265px]";
          const grow = "md:basis-[410px]"; // 激活后的目标宽度（20%压缩）

          return (
            <motion.div
              key={it.title + i}
              layout
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={reveal}
              onHoverStart={() => !isTouch && setActive(i)}
              onHoverEnd={() => !isTouch && setActive(null)}
              onClick={() => isTouch && setActive(isActive ? null : i)}
              aria-expanded={isActive}
              transition={
                reduced
                  ? undefined
                  : { layout: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } }
              }
              className={[
                "group relative overflow-hidden rounded-2xl border border-white/10",
                "bg-white/[0.04] text-white shadow-[0_10px_30px_rgba(0,0,0,.25)]",
                "h-[410px]", // 压缩高度 (512px * 0.8 = 410px)
                isActive ? grow : base,
                "w-full md:w-auto flex-shrink-0", // 确保一字排开不换行
                "cursor-pointer select-none",
                isActive ? "ring-1 ring-white/30" : "ring-1 ring-white/10",
                isActive ? "shadow-[0_16px_40px_rgba(0,0,0,.35)]" : "",
              ].join(" ")}
              style={{
                filter:
                  active !== null && !isActive ? "brightness(0.85) saturate(0.9)" : "none",
              }}
            >
              {/* 渐变雾罩（悬停更明显） */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.gradient ?? "from-violet-500/20 to-cyan-500/20"} opacity-0 blur-2xl transition duration-500 group-hover:opacity-100`}
              />

              {/* 媒体位：图片或视频 - 占据顶部大部分空间 */}
              <div className="absolute inset-0">
                {(() => {
                  // 优先使用静态/动态媒体，其次使用通用媒体
                  const currentMediaSrc = isActive 
                    ? (it.dynamicMediaSrc || it.mediaSrc)
                    : (it.staticMediaSrc || it.mediaSrc);
                  
                  if (currentMediaSrc?.endsWith(".mp4")) {
                    return (
                      <div className="flex items-center justify-center h-full w-full">
                        <AutoVideo 
                          src={currentMediaSrc} 
                          fallbackSrc={it.staticMediaSrc}
                          className="h-[60%] w-[98%] object-contain rounded-lg -translate-y-[40px]" 
                        />
                      </div>
                    );
                  } else if (currentMediaSrc) {
                    // 为Supply Chain和Brand Owner图片优化显示位置
                    const isSupplyChainImage = currentMediaSrc.includes('supply-chain') || 
                                             currentMediaSrc.includes('export-compliance') || 
                                             currentMediaSrc.includes('cost-optimizer');
                    const isBrandOwnerImage = currentMediaSrc.includes('brand-analyzer') ||
                                            currentMediaSrc.includes('scope-tracker') ||
                                            currentMediaSrc.includes('sustainability-reporter') ||
                                            currentMediaSrc.includes('goal-manager');
                    const isScopeTrackerImage = currentMediaSrc.includes('scope-tracker');
                    let objectPosition = 'center center';
                    if (isSupplyChainImage) {
                      objectPosition = 'center 30%';
                    } else if (isScopeTrackerImage) {
                      objectPosition = 'center 45%'; // 显示更多身体部分，减少头部比例
                    } else if (isBrandOwnerImage) {
                      objectPosition = 'center 35%';
                    }
                    return (
                      <img 
                        src={currentMediaSrc} 
                        alt={it.title || 'feature image'} 
                        className="h-full w-full object-cover" 
                        style={{ objectPosition }} 
                      />
                    );
                  } else {
                    return <div className={`h-full w-full ${it.background ?? 'bg-gradient-to-br from-neutral-900 to-neutral-800'}`} />;
                  }
                })()}
              </div>

              {/* 文案区 - 定位到底部 */}
              <div className="absolute bottom-0 left-0 right-0 h-28 p-3 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
                <div className="text-base md:text-lg font-semibold">{it.title}</div>
                <p className="mt-1 text-xs text-white/80">
                  {isActive ? 
                    (it.summary.length > 80 ? it.summary.substring(0, 80) + "..." : it.summary) 
                    : it.summary
                  }
                </p>

                {/* 展开后的更多内容 */}
                <AnimatePresence initial={false}>
                  {isActive && (it.details?.length ?? 0) > 0 && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                      className="mt-3 space-y-1 text-xs text-white/80"
                    >
                      {it.details!.map((d, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                          <span>{d}</span>
                        </div>
                      ))}
                      <button className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-neutral-900 text-xs font-medium hover:scale-[1.02] transition">
                        Get started <span aria-hidden>→</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 描边随光增强 */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}