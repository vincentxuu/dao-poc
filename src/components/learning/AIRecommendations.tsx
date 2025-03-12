import React from 'react';

interface LearningStyle {
  visual: number;
  auditory: number;
  kinesthetic: number;
  dominantStyle: 'visual' | 'auditory' | 'kinesthetic';
}

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  recommendedResources: {
    visual: Resource[];
    auditory: Resource[];
    kinesthetic: Resource[];
  };
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'book' | 'project' | 'workshop';
  url: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  reviews: number;
}

// 模擬主題數據庫
const topics: Topic[] = [
  {
    id: 'web-dev',
    name: 'Web 開發',
    description: '學習前端和後端開發技術',
    difficulty: 'beginner',
    prerequisites: ['HTML基礎', 'JavaScript基礎'],
    recommendedResources: {
      visual: [
        {
          id: 'v1',
          title: 'Web開發視覺化教程',
          type: 'video',
          url: 'https://example.com/web-dev-visual',
          duration: '2小時',
          difficulty: 'beginner',
          tags: ['HTML', 'CSS', 'JavaScript'],
          rating: 4.8,
          reviews: 1200
        },
        {
          id: 'v2',
          title: '互動式CSS學習平台',
          type: 'course',
          url: 'https://example.com/interactive-css',
          duration: '4週',
          difficulty: 'beginner',
          tags: ['CSS', '動畫'],
          rating: 4.7,
          reviews: 800
        }
      ],
      auditory: [
        {
          id: 'a1',
          title: 'Web開發播客系列',
          type: 'course',
          url: 'https://example.com/web-dev-podcast',
          duration: '10集',
          difficulty: 'beginner',
          tags: ['概念講解', '經驗分享'],
          rating: 4.6,
          reviews: 500
        },
        {
          id: 'a2',
          title: '線上講座：現代Web開發',
          type: 'workshop',
          url: 'https://example.com/web-dev-workshop',
          duration: '3小時',
          difficulty: 'intermediate',
          tags: ['實時互動', 'Q&A'],
          rating: 4.9,
          reviews: 300
        }
      ],
      kinesthetic: [
        {
          id: 'k1',
          title: '實戰項目：個人網站開發',
          type: 'project',
          url: 'https://example.com/personal-website-project',
          duration: '2週',
          difficulty: 'beginner',
          tags: ['實戰', '項目開發'],
          rating: 4.8,
          reviews: 600
        },
        {
          id: 'k2',
          title: '互動式編程練習',
          type: 'course',
          url: 'https://example.com/coding-exercises',
          duration: '自定進度',
          difficulty: 'beginner',
          tags: ['練習', '即時反饋'],
          rating: 4.7,
          reviews: 900
        }
      ]
    }
  },
  // 可以添加更多主題...
];

interface AIRecommendationsProps {
  learningStyle: LearningStyle;
  selectedTopic: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: number;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  learningStyle,
  selectedTopic,
  userLevel,
  timeCommitment
}) => {
  const topic = topics.find(t => t.id === selectedTopic) || topics[0];

  // 根據學習風格權重分配資源
  const getWeightedResources = () => {
    const { visual, auditory, kinesthetic } = learningStyle;
    const total = visual + auditory + kinesthetic;
    
    const resources = [
      ...topic.recommendedResources.visual.map(r => ({ ...r, weight: visual / total })),
      ...topic.recommendedResources.auditory.map(r => ({ ...r, weight: auditory / total })),
      ...topic.recommendedResources.kinesthetic.map(r => ({ ...r, weight: kinesthetic / total }))
    ];

    // 根據用戶級別過濾
    return resources
      .filter(r => r.difficulty === userLevel)
      .sort((a, b) => {
        // 綜合考慮權重、評分和評論數
        const scoreA = (a.weight * 5 + a.rating) * Math.log10(a.reviews + 1);
        const scoreB = (b.weight * 5 + b.rating) * Math.log10(b.reviews + 1);
        return scoreB - scoreA;
      });
  };

  const weightedResources = getWeightedResources();

  // 根據每週學習時間推薦適量資源
  const getTimeBasedRecommendations = () => {
    let totalDuration = 0;
    return weightedResources.filter(resource => {
      // 粗略估算所需時間（小時）
      let hours = 0;
      if (resource.duration.includes('週')) {
        hours = parseInt(resource.duration) * 5; // 假設每週5小時
      } else if (resource.duration.includes('小時')) {
        hours = parseInt(resource.duration);
      } else if (resource.duration.includes('集')) {
        hours = parseInt(resource.duration) * 0.5; // 假設每集30分鐘
      }

      if (totalDuration + hours <= timeCommitment * 4) { // 假設4週完成
        totalDuration += hours;
        return true;
      }
      return false;
    });
  };

  const recommendedResources = getTimeBasedRecommendations();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">AI 學習建議</h3>
        <p className="text-sm text-blue-700">
          根據你的學習風格（{learningStyle.dominantStyle === 'visual' ? '視覺型' : 
          learningStyle.dominantStyle === 'auditory' ? '聽覺型' : '體驗型'}）和每週 {timeCommitment} 小時的學習時間，
          我們為你制定了以下學習建議：
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {resource.type} • {resource.duration}
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {Math.round(resource.weight * 100)}% 匹配度
              </span>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(resource.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({resource.reviews} 評價)
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              開始學習
              <svg
                className="ml-2 -mr-0.5 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
