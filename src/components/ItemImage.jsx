import React, { useState } from 'react';
import { 
  Laptop, Key, Briefcase, Shirt, FileText, 
  Watch, Package 
} from 'lucide-react';

const getCategoryIcon = (category, size = 24) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('elect') || cat.includes('tech') || cat.includes('phone') || cat.includes('laptop')) {
    return <Laptop size={size} />;
  }
  if (cat.includes('key')) {
    return <Key size={size} />;
  }
  if (cat.includes('bag') || cat.includes('backpack')) {
    return <Briefcase size={size} />;
  }
  if (cat.includes('cloth') || cat.includes('wear') || cat.includes('fleece') || cat.includes('shirt')) {
    return <Shirt size={size} />;
  }
  if (cat.includes('doc') || cat.includes('card') || cat.includes('book') || cat.includes('id')) {
    return <FileText size={size} />;
  }
  if (cat.includes('access') || cat.includes('watch') || cat.includes('bottle') || cat.includes('glass')) {
    return <Watch size={size} />;
  }
  return <Package size={size} />;
};

const getCategoryTheme = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('elect')) {
    return { bg: 'rgba(37, 99, 235, 0.15)', color: '#3B82F6', border: 'rgba(37, 99, 235, 0.3)' };
  }
  if (cat.includes('key')) {
    return { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' };
  }
  if (cat.includes('bag')) {
    return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: 'rgba(16, 185, 129, 0.3)' };
  }
  if (cat.includes('cloth')) {
    return { bg: 'rgba(244, 63, 94, 0.15)', color: '#F43F5E', border: 'rgba(244, 63, 94, 0.3)' };
  }
  if (cat.includes('doc')) {
    return { bg: 'rgba(14, 165, 233, 0.15)', color: '#0EA5E9', border: 'rgba(14, 165, 233, 0.3)' };
  }
  if (cat.includes('access')) {
    return { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7', border: 'rgba(168, 85, 247, 0.3)' };
  }
  return { bg: 'rgba(100, 116, 139, 0.15)', color: 'var(--text-muted)', border: 'var(--border-subtle)' };
};

/**
 * ItemImage
 * Robust item image component with automatic referer suppression,
 * clean CORS handling, and styled category-specific fallback illustrations.
 */
export const ItemImage = ({ 
  src, 
  alt = 'Item', 
  category = '', 
  className = '', 
  style = {}, 
  imgStyle = {},
  iconSize = 24,
  showLabel = false 
}) => {
  const [hasError, setHasError] = useState(false);
  const theme = getCategoryTheme(category);

  const normalizedSrc = src && src.startsWith('/uploads/') ? `/api${src}` : src;

  if (!normalizedSrc || hasError) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.bg,
          color: theme.color,
          border: `1px solid ${theme.border}`,
          borderRadius: 'inherit',
          gap: '0.35rem',
          userSelect: 'none',
          ...style,
        }}
      >
        {getCategoryIcon(category, iconSize)}
        {showLabel && (
          <span style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.85, textTransform: 'capitalize' }}>
            {category || 'Item'}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setHasError(true)}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: 'inherit',
        ...imgStyle,
        ...style,
      }}
    />
  );
};
