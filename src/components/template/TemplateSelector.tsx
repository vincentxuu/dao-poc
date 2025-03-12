import React from 'react';

type Template = 'creative' | 'minimal' | 'professional';

interface TemplateSelectorProps {
  currentTemplate: Template;
  onTemplateChange: (template: Template) => void;
}

const templates: { id: Template; name: string; description: string }[] = [
  {
    id: 'creative',
    name: '創意風格',
    description: '充滿活力的設計，適合展示創意作品和個人特色',
  },
  {
    id: 'minimal',
    name: '簡約風格',
    description: '乾淨簡潔的設計，突出內容的本質',
  },
  {
    id: 'professional',
    name: '專業風格',
    description: '正式商務的設計，適合職業發展展示',
  },
];

export default function TemplateSelector({ currentTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template.id)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            currentTemplate === template.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
          }`}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">{template.name}</h3>
          <p className="text-sm text-gray-600">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
