import React from 'react';
import { PortfolioView } from '../../types/portfolio';

interface TemplateSelectorProps {
  currentTemplate?: PortfolioView['template'];
  onTemplateChange: (template: PortfolioView['template']) => void;
}

export default function TemplateSelector({ currentTemplate = 'minimal', onTemplateChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'minimal',
      name: '極簡風格',
      description: '簡潔清晰的版面配置，突出重要內容',
      icon: (
        <svg className="h-8 w-8 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: 'creative',
      name: '創意風格',
      description: '動態與互動效果，展現個人特色',
      icon: (
        <svg className="h-8 w-8 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'professional',
      name: '專業風格',
      description: '正式的排版與配色，適合職場展示',
      icon: (
        <svg className="h-8 w-8 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'technical',
      name: '技術風格',
      description: '程式碼風格設計，突出技術能力',
      icon: (
        <svg className="h-8 w-8 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white">選擇版面風格</h3>
        <p className="mt-1 text-sm text-gray-300">
          選擇最適合展示您作品集的版面風格
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative rounded-lg border group
                ${currentTemplate === template.id
                  ? 'ring-2 ring-blue-400 border-blue-400 bg-gray-700'
                  : 'border-gray-600 hover:border-blue-400 bg-gray-700/50'
                } 
                p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-gray-700`}
              onClick={() => onTemplateChange(template.id as PortfolioView['template'])}
            >
              <div className="flex flex-col items-center text-center">
                {template.icon}
                <h4 className="mt-4 font-medium text-white group-hover:text-blue-400">{template.name}</h4>
                <p className="mt-1 text-sm text-gray-300">{template.description}</p>
              </div>
              {currentTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview */}
      <div className="mt-6 border-t border-gray-600 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-white">預覽效果</h4>
            <p className="mt-1 text-xs text-gray-300">
              選擇後可以即時預覽版面效果
            </p>
          </div>
          <button
            onClick={() => onTemplateChange(currentTemplate)}
            className="inline-flex items-center px-3 py-2 border border-blue-400 text-sm leading-4 font-medium rounded-md text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            套用風格
          </button>
        </div>
      </div>
    </div>
  );
}
