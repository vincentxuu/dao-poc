import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { TemplateProvider } from '../contexts/TemplateContext';
import { PortfolioView, PortfolioTemplate } from '../types/portfolio';

function MyApp({ Component, pageProps }: AppProps) {
  // Using a valid value from the PortfolioTemplate type
  const initialTemplate: PortfolioTemplate = 'minimal';

  return (
    <TemplateProvider template={initialTemplate}>
      <Component {...pageProps} />
    </TemplateProvider>
  );
}

export default MyApp;