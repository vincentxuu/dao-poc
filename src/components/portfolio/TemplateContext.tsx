import React, { createContext, useContext, useState } from 'react';
import { PortfolioTemplate } from '../../types/portfolio';

interface TemplateContextType {
  template: PortfolioTemplate;
  styles: {
    container: string;
    header: string;
    title: string;
    subtitle: string;
    button: string;
    card: string;
    nav: string;
  };
  setTemplate: (template: PortfolioTemplate) => void;
}

const defaultStyles = {
  container: 'bg-gray-900',
  header: 'bg-gray-800/50 backdrop-blur-sm rounded-lg',
  title: 'text-2xl font-bold text-white',
  subtitle: 'text-gray-400',
  button: 'bg-blue-600 text-white hover:bg-blue-700',
  card: 'bg-gray-800/50 backdrop-blur-sm rounded-lg',
  nav: 'bg-gray-800/30 backdrop-blur-sm rounded-lg',
};

const TemplateContext = createContext<TemplateContextType>({
  template: 'minimal',
  styles: defaultStyles,
  setTemplate: () => {},
});

export const useTemplate = () => useContext(TemplateContext);

export const TemplateProvider: React.FC<{ children: React.ReactNode; template?: PortfolioTemplate }> = ({
  children,
  template: initialTemplate = 'minimal',
}) => {
  const [template, setTemplate] = useState<PortfolioTemplate>(initialTemplate);

  const getTemplateStyles = (template: PortfolioTemplate) => {
    switch (template) {
      case 'creative':
        return {
          container: 'bg-gradient-to-br from-purple-900 to-blue-900',
          header: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
          title: 'text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400',
          subtitle: 'text-blue-200',
          button: 'bg-purple-500 text-white hover:bg-purple-600',
          card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
          nav: 'bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10',
        };
      case 'technical':
        return {
          container: 'bg-slate-900',
          header: 'bg-slate-800 border-l-4 border-cyan-500',
          title: 'text-2xl font-mono font-bold text-cyan-400',
          subtitle: 'text-slate-400 font-mono',
          button: 'bg-cyan-600 text-white hover:bg-cyan-700',
          card: 'bg-slate-800 border-l-4 border-cyan-500',
          nav: 'bg-slate-800/80 border-l-2 border-cyan-500/50',
        };
      case 'professional':
        return {
          container: 'bg-gray-50',
          header: 'bg-white shadow-lg',
          title: 'text-2xl font-semibold text-gray-900',
          subtitle: 'text-gray-600',
          button: 'bg-indigo-600 text-white hover:bg-indigo-700',
          card: 'bg-white shadow-lg',
          nav: 'bg-white shadow-md',
        };
      default:
        return defaultStyles;
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        template,
        styles: getTemplateStyles(template),
        setTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
