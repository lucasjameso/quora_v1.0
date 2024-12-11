import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'right' | 'top' | 'bottom' | 'left';
  offset?: number;
  sideOffset?: number;
}

export function Tooltip({ 
  content, 
  children, 
  side = 'right', 
  offset = 8,
  sideOffset = 0
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipPosition = {
        top: rect.top + rect.height / 2,
        left: rect.right + offset
      };

      if (side === 'right') {
        tooltipPosition.top += sideOffset;
      }

      setPosition(tooltipPosition);
    }
  }, [isVisible, offset, side, sideOffset]);

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex" 
      onMouseEnter={() => setIsVisible(true)} 
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="fixed z-[100] px-2 py-1 text-sm 
                     bg-[#333333] text-[#F4F5F1] rounded whitespace-nowrap
                     shadow-lg border border-[#404040]/20"
          style={{ 
            pointerEvents: 'none',
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateY(-50%)'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}