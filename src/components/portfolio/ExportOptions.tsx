import React, { useState } from 'react';
import { LearningItem } from '../../types/portfolio';

interface ExportOptionsProps {
  item: LearningItem;
}

export default function ExportOptions({ item }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'html' | 'markdown') => {
    setIsExporting(true);
    try {
      // Here we would implement actual export logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock export data
      const exportData = {
        title: item.title,
        description: item.description,
        date: item.date,
        skills: item.skills,
        content: item.content.text,
      };

      // Create a download link
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">匯出選項</h3>
      
      <div className="space-y-3">
        <button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.344c2.672 0 4.011-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"/>
            </svg>
            匯出為 PDF
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button
          onClick={() => handleExport('html')}
          disabled={isExporting}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4zm6 1a1 1 0 10-2 0v1a1 1 0 102 0V5zm-3 4a1 1 0 10-2 0v1a1 1 0 102 0V9z" clipRule="evenodd"/>
            </svg>
            匯出為 HTML
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button
          onClick={() => handleExport('markdown')}
          disabled={isExporting}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4zm2 2a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            匯出為 Markdown
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>

      {isExporting && (
        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          正在匯出...
        </div>
      )}
    </div>
  );
}
