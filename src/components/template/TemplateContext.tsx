import React, { createContext, useContext, useState } from 'react';

type Template = 'creative' | 'minimal' | 'professional';

interface TemplateContextType {
  template: Template;
  styles: {
    container: string;
    header: string;
    title: string;
    subtitle: string;
    button: string;
    nav: string;
    card: string;
  };
  setTemplate: (template: Template) => void;
}

const defaultStyles = {
  creative: {
    container: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    header: 'bg-white/80 backdrop-blur-lg rounded-xl shadow-lg',
    title: 'text-3xl font-bold text-blue-900',
    subtitle: 'text-blue-600',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
    nav: 'bg-white/80 backdrop-blur-lg rounded-xl shadow-lg',
    card: 'bg-white/80 backdrop-blur-lg rounded-xl shadow-lg',
  },
  minimal: {
    container: 'bg-white',
    header: 'bg-gray-50',
    title: 'text-2xl font-semibold text-gray-900',
    subtitle: 'text-gray-600',
    button: 'bg-gray-900 text-white hover:bg-gray-800',
    nav: 'bg-gray-50',
    card: 'bg-gray-50',
  },
  professional: {
    container: 'bg-slate-50',
    header: 'bg-white shadow',
    title: 'text-2xl font-bold text-slate-900',
    subtitle: 'text-slate-600',
    button: 'bg-slate-800 text-white hover:bg-slate-700',
    nav: 'bg-white shadow',
    card: 'bg-white shadow',
  },
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

interface TemplateProviderProps {
  children: React.ReactNode;
  template?: Template;
}

export function TemplateProvider({ children, template: initialTemplate = 'creative' }: TemplateProviderProps) {
  const [template, setTemplate] = useState<Template>(initialTemplate);

  return (
    <TemplateContext.Provider value={{
      template,
      styles: defaultStyles[template],
      setTemplate,
    }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}
