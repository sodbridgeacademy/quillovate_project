import { useEffect, useState } from 'react';
import {
  Captions,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Youtube,
} from 'lucide-react';

interface YouTubeThumbnailProps {
  title: string;
  subtitle?: string;
  duration: string;
  category?: string;
  onPlay: () => void;
}

export function YouTubeThumbnailFrame({
  title,
  subtitle,
  duration,
  category,
  onPlay,
}: YouTubeThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play video: ${title}`}
      className="group relative w-full aspect-video overflow-hidden rounded-sm border border-soft-stone dark:border-white/15 bg-gradient-to-br from-[#022146] via-[#062b58] to-[#01142B] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold"
    >
      {/* Subtle architectural line pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(183, 132, 56, 0.35), transparent 55%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      {/* Top YouTube-style overlay header */}
      <div className="absolute inset-x-0 top-0 p-3 sm:p-4 flex items-center justify-between gap-2 z-10">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/85 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-sm">
          <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>{category ?? 'YouTube Embed'}</span>
        </span>
        <span className="text-[11px] font-mono tabular-nums text-white bg-black/70 px-2 py-0.5 rounded-sm">
          {duration}
        </span>
      </div>

      {/* Centered YouTube Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-lg bg-[#FF0000]/95 group-hover:bg-[#FF0000] group-hover:scale-105 transition-transform duration-200 flex items-center justify-center shadow-lg">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom editorial caption */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white z-10">
        {subtitle && (
          <p className="text-[11px] uppercase tracking-wider text-pale-gold font-medium truncate mb-0.5">
            {subtitle}
          </p>
        )}
        <p className="font-serif text-sm sm:text-base font-medium text-white leading-snug line-clamp-2">
          {title}
        </p>
      </div>
    </button>
  );
}

interface YouTubeInteractivePlayerProps {
  title: string;
  speakerLine: string;
  duration: string;
  quoteOrSummary: string;
  youtubeId?: string;
}

export function YouTubeInteractivePlayer({
  title,
  speakerLine,
  duration,
  quoteOrSummary,
  youtubeId,
}: YouTubeInteractivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [progress, setProgress] = useState(14);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  if (youtubeId) {
    return (
      <div className="w-full aspect-video rounded-sm overflow-hidden border border-soft-stone dark:border-white/15 bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-soft-stone dark:border-white/15 bg-[#041122] text-white flex flex-col justify-between">
      {/* Background stage */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 25%, rgba(183,132,56,0.22), transparent 55%), linear-gradient(135deg, #022146 0%, #010d1c 100%)',
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent">
        <div className="min-w-0">
          <p className="text-xs font-medium text-white truncate">{title}</p>
          <p className="text-[11px] text-white/70 truncate">{speakerLine}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-white/80 bg-black/50 px-2 py-1 rounded-sm shrink-0">
          <Youtube className="w-3.5 h-3.5 text-red-500" />
          <span>YouTube Player Preview</span>
        </span>
      </div>

      {/* Center Stage / Captions */}
      <div className="relative z-10 px-6 sm:px-10 flex flex-col items-center justify-center text-center my-auto">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? 'Pause video preview' : 'Play video preview'}
          className="w-12 h-12 rounded-full bg-white/15 hover:bg-primary-gold/90 border border-white/25 flex items-center justify-center transition-colors cursor-pointer mb-3"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        {showCaptions && (
          <div className="max-w-lg bg-black/70 backdrop-blur-xs px-4 py-2 rounded-sm border border-white/10">
            <p className="text-xs sm:text-sm font-serif italic text-warm-ivory/95 leading-relaxed line-clamp-3">
              {quoteOrSummary}
            </p>
          </div>
        )}
      </div>

      {/* Bottom YouTube-style Controls */}
      <div className="relative z-10 px-3 sm:px-4 pb-2.5 pt-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          aria-label="Seek video progress"
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-1 accent-red-600 cursor-pointer mb-2"
        />
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1 hover:text-pale-gold transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1 hover:text-pale-gold transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <span className="font-mono text-[11px] tabular-nums text-white/80">
              {isPlaying ? 'Playing' : 'Paused'} · {duration}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowCaptions((c) => !c)}
            aria-label="Toggle captions"
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] transition-colors cursor-pointer ${
              showCaptions
                ? 'text-pale-gold bg-white/10'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Captions className="w-3.5 h-3.5" />
            <span>CC</span>
          </button>
        </div>
      </div>
    </div>
  );
}
