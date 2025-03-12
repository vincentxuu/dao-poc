import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';

interface TemplateCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TemplateCard({ children, className = '' }: TemplateCardProps) {
  const { styles } = useTemplate();

  return (
    <div className={`${styles.card} p-6 ${className}`}>
      {children}
    </div>
  );
}
