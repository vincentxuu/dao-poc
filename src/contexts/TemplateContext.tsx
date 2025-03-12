import React, { createContext, useContext, useState } from 'react';
import { PortfolioView } from '../types/portfolio';
import { StyleCategory, getTemplateStyle } from '../styles/templates';

interface TemplateContextType {
  template: PortfolioView['template'];
  styles: Record<StyleCategory, string>;
  setTemplate: (template: PortfolioView['template']) => void;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}

interface TemplateProviderProps {
  template: PortfolioView['template'];
  children: React.ReactNode;
}

export function TemplateProvider({ template: initialTemplate, children }: TemplateProviderProps) {
  const [template, setTemplate] = useState(initialTemplate);
  const styles = {
    container: getTemplateStyle(template, 'container'),
    header: getTemplateStyle(template, 'header'),
    card: getTemplateStyle(template, 'card'),
    title: getTemplateStyle(template, 'title'),
    subtitle: getTemplateStyle(template, 'subtitle'),
    accent: getTemplateStyle(template, 'accent'),
    button: getTemplateStyle(template, 'button'),
    nav: getTemplateStyle(template, 'nav'),
    divider: getTemplateStyle(template, 'divider'),
  };

  return (
    <TemplateContext.Provider value={{ template, styles, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}
