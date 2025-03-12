import React, { useState } from 'react';
import Head from 'next/head';
import { BusinessCard } from '@/components/portfolio/BusinessCard';
import { BusinessCardInfo } from '@/types/portfolio/BusinessCard';

const demoBusinessCard: BusinessCardInfo = {
  name: "王小明",
  tagline: "全端工程師 | AI 技術愛好者",
  professionalAreas: ["Web Development", "AI/ML", "UI/UX"],
  skills: ["React", "Node.js", "Python", "TensorFlow"],
  contactInfo: {
    line: "wang_dev",
    linkedin: "wang-dev",
    email: "wang@example.com",
    telegram: "wang_dev",
  },
  status: {
    isActive: true,
    label: "開放合作機會",
  },
  ctaButtons: [
    {
      label: "查看作品集",
      action: "view_portfolio",
      url: "/portfolio",
    },
    {
      label: "立即合作",
      action: "collaborate",
      url: "/contact",
    },
  ],
  recommendations: [
    {
      author: "陳小華",
      content: "小明在我們的AI專案中展現了優秀的技術能力和團隊合作精神。他不僅能夠快速掌握新技術，還能有效地解決複雜問題。",
      date: "2025-02-15",
    },
    {
      author: "李大方",
      content: "作為專案經理，我很欣賞小明的主動性和責任感。他總是能夠按時完成任務，並提出創新的解決方案。",
      date: "2025-01-20",
    },
  ],
};

const BusinessCardPage = () => {
  const [selectedVariant, setSelectedVariant] = useState<'minimal' | 'creative' | 'business' | 'tech'>('minimal');

  return (
    <>
      <Head>
        <title>個人名片 - 學習島</title>
        <meta name="description" content="展示您的專業技能、經驗和聯繫方式的個人名片" />
        <meta name="keywords" content="個人名片,專業技能,作品集,學習歷程" />
      </Head>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">個人名片</h1>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedVariant('minimal')}
              className={`px-4 py-2 rounded ${
                selectedVariant === 'minimal' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              極簡風
            </button>
            <button
              onClick={() => setSelectedVariant('creative')}
              className={`px-4 py-2 rounded ${
                selectedVariant === 'creative' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              創意風
            </button>
            <button
              onClick={() => setSelectedVariant('business')}
              className={`px-4 py-2 rounded ${
                selectedVariant === 'business' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              商務風
            </button>
            <button
              onClick={() => setSelectedVariant('tech')}
              className={`px-4 py-2 rounded ${
                selectedVariant === 'tech' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              技術風
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <BusinessCard info={demoBusinessCard} variant={selectedVariant} />
        </div>
      </div>
      </div>
    </>
  );
};

export default BusinessCardPage;
