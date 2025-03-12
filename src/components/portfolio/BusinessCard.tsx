import React, { useState } from 'react';
import { BusinessCardInfo } from '@/types/portfolio/BusinessCard';
import { QRCodeSVG } from 'qrcode.react';
import { 
  EnvelopeIcon, 
  ChatBubbleLeftIcon,
  ShareIcon,
  HandThumbUpIcon,
  DocumentArrowDownIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { exportAsImage, exportAsPDF, exportAsHTML } from '@/utils/portfolio/exportUtils';

interface BusinessCardProps {
  info: BusinessCardInfo;
  variant?: 'minimal' | 'creative' | 'business' | 'tech';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ 
  info,
  variant = 'minimal' 
}) => {
  const [showQR, setShowQR] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'creative':
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white';
      case 'business':
        return 'bg-slate-800 text-white';
      case 'tech':
        return 'bg-black text-green-400 border border-green-400';
      default:
        return 'bg-white text-gray-800 border border-gray-200';
    }
  };

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'line':
        window.open(`https://line.me/ti/p/${value}`);
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/in/${value}`);
        break;
      case 'telegram':
        window.open(`https://t.me/${value}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value}`);
        break;
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: info.name,
          text: info.tagline,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className={`max-w-md rounded-xl shadow-lg p-6 ${getVariantStyles()}`}>
      {/* Status Badge */}
      {info.status.isActive && (
        <div className="flex justify-end mb-4">
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
            {info.status.label}
          </span>
        </div>
      )}

      {/* Basic Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{info.name}</h2>
        <p className="text-lg mb-4">{info.tagline}</p>
        
        {/* Professional Areas & Skills */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {info.professionalAreas.map((area, index) => (
            <span key={index} className="px-3 py-1 text-sm rounded-full bg-opacity-20 bg-blue-500">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {Object.entries(info.contactInfo).map(([type, value]) => (
          value && (
            <button
              key={type}
              onClick={() => handleContact(type, value)}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-opacity-20 bg-blue-500 hover:bg-opacity-30 transition-all"
            >
              <EnvelopeIcon className="w-5 h-5" />
              {type}
            </button>
          )
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 mb-6">
        {info.ctaButtons.map((button, index) => (
          <a
            key={index}
            href={button.url}
            className="block w-full text-center py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            {button.label}
          </a>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
        >
          <QRCodeSVG
            value={window.location.href}
            size={24}
            className="inline-block"
          />
          QR Code
        </button>
        
        <button
          onClick={() => setShowRecommendations(!showRecommendations)}
          className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
        >
          <HandThumbUpIcon className="w-5 h-5" />
          推薦
        </button>

        <button
          onClick={() => setShowExportOptions(true)}
          className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          匯出
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
        >
          <ShareIcon className="w-5 h-5" />
          分享
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl">
            <QRCodeSVG value={window.location.href} size={200} />
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* Recommendations Modal */}
      {showRecommendations && info.recommendations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">推薦</h3>
            <div className="space-y-4">
              {info.recommendations.map((rec, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-gray-600">{rec.content}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>{rec.author}</span>
                    <span className="mx-2">•</span>
                    <span>{rec.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowRecommendations(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* Export Options Modal */}
      {showExportOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">匯出名片</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  exportAsImage('business-card', `${info.name}-名片`);
                  setShowExportOptions(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                匯出為圖片 (PNG)
              </button>
              <button
                onClick={() => {
                  exportAsPDF('business-card', `${info.name}-名片`);
                  setShowExportOptions(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                匯出為 PDF
              </button>
              <button
                onClick={() => {
                  exportAsHTML('business-card', `${info.name}-名片`);
                  setShowExportOptions(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
                匯出為 HTML
              </button>
            </div>
            <button
              onClick={() => setShowExportOptions(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
