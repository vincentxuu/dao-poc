import React from 'react';
import { useTemplate } from './TemplateContext';

interface TemplateCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TemplateCard({ children, className = '' }: TemplateCardProps) {
  const { styles } = useTemplate();
  
  return (
    <div className={`${styles.card} p-6 rounded-xl ${className}`}>
      {children}
    </div>
  );
}
