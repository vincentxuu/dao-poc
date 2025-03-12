import React, { useEffect, useState } from 'react';
import { MediaType } from '../../types/portfolio';

type EmbedPlatform = 'figma' | 'github' | 'notion' | 'other';

interface EmbedConfig {
  platform: EmbedPlatform;
  height: string;
  className: string;
}

interface InteractiveEmbedProps {
  type: MediaType;
  url: string;
  embedCode?: string;
  previewUrl?: string;
}

export default function InteractiveEmbed({ type, url, embedCode, previewUrl }: InteractiveEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detectPlatform = (url: string): EmbedPlatform => {
    if (url.includes('figma.com')) return 'figma';
    if (url.includes('github.com')) return 'github';
    if (url.includes('notion.so')) return 'notion';
    return 'other';
  };

  const getEmbedConfig = (platform: EmbedPlatform): EmbedConfig => {
    const configs: Record<EmbedPlatform, EmbedConfig> = {
      figma: {
        platform: 'figma',
        height: '450px',
        className: 'w-full rounded-lg shadow-lg'
      },
      github: {
        platform: 'github',
        height: '400px',
        className: 'w-full rounded-lg border border-gray-200'
      },
      notion: {
        platform: 'notion',
        height: '500px',
        className: 'w-full rounded-lg shadow-md'
      },
      other: {
        platform: 'other',
        height: '350px',
        className: 'w-full rounded-lg'
      }
    };
    return configs[platform];
  };
  const renderEmbed = () => {
    switch (type) {
      case 'figma':
        return (
          <iframe
            className="w-full h-[500px] rounded-lg border border-gray-200"
            src={url}
            allowFullScreen
          />
        );
      case 'github':
        return (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-6 w-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.916.678 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View on GitHub
              </a>
            </div>
            {embedCode && (
              <div dangerouslySetInnerHTML={{ __html: embedCode }} className="overflow-hidden rounded-lg" />
            )}
          </div>
        );
      case 'notion':
        return (
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4V4z" fill="#fff"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#000"/>
              </svg>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View in Notion
              </a>
            </div>
            <iframe
              src={url}
              className="w-full h-[400px] rounded-lg border border-gray-200"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-4">
      {renderEmbed()}
      {previewUrl && (
        <img 
          src={previewUrl} 
          alt={`Preview of ${type} content`} 
          className="mt-2 rounded-lg border border-gray-200 w-full"
        />
      )}
    </div>
  );
}
