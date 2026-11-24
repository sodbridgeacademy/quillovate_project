import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Quillovate Editorial Archive',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-primary via-[#072a57] to-[#01142B] text-warm-ivory p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-14 h-14 rounded-sm border border-primary-gold/40 bg-primary-gold/10 flex items-center justify-center mb-4">
          <BookOpen className="w-6 h-6 text-pale-gold" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-lg text-white font-medium max-w-xs">
          {fallbackTitle}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-pale-gold/80 mt-2">
          Editorial &amp; Research Consultancy
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
