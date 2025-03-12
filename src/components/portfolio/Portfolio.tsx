import React, { useState } from 'react';
import { UserPortfolio, LearningItem } from '@/types/portfolio';
import {
  Squares2X2Icon,
  ClockIcon,
  DocumentTextIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

interface PortfolioProps {
  portfolio: UserPortfolio;
  onInteraction?: (type: 'bookmark' | 'comment', itemId: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  portfolio,
  onInteraction,
}) => {
  const [selectedItem, setSelectedItem] = useState<LearningItem | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'timeline' | 'detail'>(portfolio.currentView.type === 'grid' || portfolio.currentView.type === 'timeline' || portfolio.currentView.type === 'detailed' ? portfolio.currentView.type === 'detailed' ? 'detail' : portfolio.currentView.type : 'grid');

  const handleInteraction = (type: 'bookmark' | 'comment', itemId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (onInteraction) {
      onInteraction(type, itemId);
    }
  };

  return (
    <div className="space-y-8">
      {/* View Mode Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentView('grid')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'grid'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Squares2X2Icon className="w-5 h-5" />
          網格展示
        </button>
        <button
          onClick={() => setCurrentView('timeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'timeline'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ClockIcon className="w-5 h-5" />
          時間軸
        </button>
        <button
          onClick={() => setCurrentView('detail')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'detail'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <DocumentTextIcon className="w-5 h-5" />
          詳細展示
        </button>
      </div>

      {/* Portfolio Content */}
      <div className="mt-8">
        {currentView === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedItem(item)}
              >
                {item.content?.media?.[0] && (
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={item.content.media[0].url}
                      alt={item.content.media[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleInteraction('bookmark', item.id, e)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleInteraction('comment', item.id, e)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'timeline' && (
          <div className="space-y-8">
            {portfolio.items.map((item) => (
              <div
                key={item.id}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-gray-200"
              >
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-blue-600 -translate-x-[5px]" />
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleInteraction('bookmark', item.id, e)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => handleInteraction('comment', item.id, e)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'detail' && selectedItem && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="mb-6 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← 返回列表
            </button>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
              
              {selectedItem.content?.media?.[0] && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedItem.content.media[0].url}
                    alt={selectedItem.content.media[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="prose max-w-none">
                <p>{selectedItem.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {new Date(selectedItem.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedItem.collaborators.length} 位協作者
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleInteraction('bookmark', selectedItem.id, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <BookmarkIcon className="w-5 h-5" />
                    收藏
                  </button>
                  <button
                    onClick={(e) => handleInteraction('comment', selectedItem.id, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    評論
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
