import { PortfolioView } from '../types/portfolio';

export const templateStyles = {
  // 極簡風格：黑白配色，簡潔的線條和留白

  minimal: {
    container: 'bg-gray-50',
    header: 'bg-white',
    card: 'bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all',
    title: 'text-2xl font-light tracking-tight text-gray-900',
    subtitle: 'text-gray-500',
    accent: 'bg-black text-white',
    button: 'bg-black text-white hover:bg-gray-900 border border-transparent',
    nav: 'bg-white',
    divider: 'border-gray-100',
  },
  creative: {
    container: 'bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50',
    header: 'bg-white/70 backdrop-blur-xl border border-purple-100 rounded-2xl',
    card: 'bg-white/70 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] transform',
    title: 'text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500',
    subtitle: 'text-purple-500',
    accent: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white',
    button: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white hover:opacity-90',
    nav: 'bg-white/70 backdrop-blur-xl border border-purple-100 rounded-2xl',
    divider: 'border-purple-100',
  },
  professional: {
    container: 'bg-slate-50',
    header: 'bg-white border-b border-slate-200 shadow-sm',
    card: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-all',
    title: 'text-2xl font-semibold text-slate-900',
    subtitle: 'text-slate-600',
    accent: 'bg-blue-600 text-white shadow-sm',
    button: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    nav: 'bg-white border border-slate-200 shadow-sm',
    divider: 'border-slate-200',
  },
  technical: {
    container: 'bg-zinc-900',
    header: 'bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-lg',
    card: 'bg-zinc-800/50 backdrop-blur rounded-lg border border-zinc-700/50 hover:border-emerald-500/50 transition-all',
    title: 'text-2xl font-mono text-emerald-400 font-semibold',
    subtitle: 'text-zinc-400 font-mono',
    accent: 'bg-emerald-500 text-white border border-emerald-400/20',
    button: 'bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-400/20',
    nav: 'bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-lg',
    divider: 'border-zinc-700/50',
  },
} as const;

export type TemplateStyleKey = keyof typeof templateStyles;
export type StyleCategory = keyof typeof templateStyles.minimal;

export const getTemplateStyle = (
  template: PortfolioView['template'],
  category: StyleCategory
) => {
  return templateStyles[template][category];
};
