import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type LearningStyle = 'visual' | 'auditory' | 'kinesthetic';

interface TestResult {
  dominantStyle: LearningStyle;
  scores: Record<LearningStyle, number>;
  timestamp: string;
  recommendations: string[];
}

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
  }[];
}

const learningRecommendations: Record<LearningStyle, string[]> = {
  visual: [
    '使用心智圖和圖表來組織信息',
    '觀看教學視頻和演示',
    '使用顏色標記重點',
    '繪製流程圖來理解過程',
    '使用視覺化的學習應用和工具'
  ],
  auditory: [
    '參加小組討論和研討會',
    '錄製學習內容並重複收聽',
    '大聲朗讀重要信息',
    '使用語音筆記工具',
    '尋找學習夥伴進行討論'
  ],
  kinesthetic: [
    '通過實際操作來學習',
    '邊走動邊學習或思考',
    '參與角色扮演活動',
    '製作實物模型',
    '進行實地考察或實驗'
  ]
};

const questions: Question[] = [
  {
    id: 1,
    text: '當學習新知識時，你更喜歡：',
    options: [
      { value: 'visual', text: '觀看相關的圖片或影片' },
      { value: 'auditory', text: '聆聽講解或討論' },
      { value: 'kinesthetic', text: '實際動手操作或體驗' }
    ]
  },
  {
    id: 2,
    text: '在記憶資訊時，你通常會：',
    options: [
      { value: 'visual', text: '將資訊視覺化或畫成圖表' },
      { value: 'auditory', text: '重複朗讀或錄音' },
      { value: 'kinesthetic', text: '邊走動邊思考或做筆記' }
    ]
  },
  {
    id: 3,
    text: '當遇到問題時，你傾向：',
    options: [
      { value: 'visual', text: '畫圖或寫下來分析' },
      { value: 'auditory', text: '與他人討論解決方案' },
      { value: 'kinesthetic', text: '直接嘗試不同方法' }
    ]
  },
  {
    id: 4,
    text: '準備報告或演講時，你會：',
    options: [
      { value: 'visual', text: '製作精美的投影片和視覺輔助' },
      { value: 'auditory', text: '反覆練習口頭表達' },
      { value: 'kinesthetic', text: '設計互動環節和示範' }
    ]
  },
  {
    id: 5,
    text: '閱讀時，你比較容易：',
    options: [
      { value: 'visual', text: '通過圖表和插圖理解內容' },
      { value: 'auditory', text: '喜歡有聲讀物或朗讀' },
      { value: 'kinesthetic', text: '邊讀邊做筆記或標記' }
    ]
  },
  {
    id: 6,
    text: '在課堂或會議上，你會：',
    options: [
      { value: 'visual', text: '注意觀察投影片和視覺資料' },
      { value: 'auditory', text: '專注聆聽並參與討論' },
      { value: 'kinesthetic', text: '做筆記或畫草圖' }
    ]
  },
  {
    id: 7,
    text: '學習新技能時，你偏好：',
    options: [
      { value: 'visual', text: '觀看示範影片' },
      { value: 'auditory', text: '聽取口頭指導' },
      { value: 'kinesthetic', text: '親自嘗試和練習' }
    ]
  }
];

interface ShareOption {
  name: string;
  icon: string;
  action: () => void;
}

interface ShareDialogProps {
  onClose: () => void;
  learningStyle: LearningStyle;
  scores: Record<LearningStyle, number>;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ onClose, learningStyle, scores }) => {
  const getStyleText = (style: LearningStyle): string => {
    switch (style) {
      case 'visual': return '視覺型';
      case 'auditory': return '聽覺型';
      case 'kinesthetic': return '體驗型';
    }
  };

  const text = `我的學習風格是${getStyleText(learningStyle)}！(視覺:${Math.round((scores.visual / questions.length) * 100)}%, 聽覺:${Math.round((scores.auditory / questions.length) * 100)}%, 體驗:${Math.round((scores.kinesthetic / questions.length) * 100)}%) 來測試你的學習風格！`;
  const url = typeof window !== 'undefined' ? `${window.location.origin}/lab/learning-style-test` : '';

  const shareOptions: ShareOption[] = [
    {
      name: 'Facebook',
      icon: '📘',
      action: () => {
        if (typeof window !== 'undefined') {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
            '_blank'
          );
        }
      }
    },
    {
      name: 'LINE',
      icon: '💬',
      action: () => {
        if (typeof window !== 'undefined') {
          window.open(
            `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            '_blank'
          );
        }
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      action: () => {
        if (typeof window !== 'undefined') {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
          );
        }
      }
    },
    {
      name: '複製連結',
      icon: '📋',
      action: () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            alert('已複製到剪貼簿！');
          });
        }
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">分享結果</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                option.action();
                onClose();
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">{option.icon}</span>
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const LearningStyleTest: React.FC = () => {
  const router = useRouter();
  const [savedResults, setSavedResults] = useState<TestResult[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('learningStyleResults');
    if (saved) {
      setSavedResults(JSON.parse(saved));
    }
  }, []);

  const getStyleCount = (style: string): number => {
    return answers.filter(answer => answer === style).length;
  };

  const getLearningStyle = (): LearningStyle => {
    const styles = {
      visual: getStyleCount('visual'),
      auditory: getStyleCount('auditory'),
      kinesthetic: getStyleCount('kinesthetic')
    };

    return Object.entries(styles).reduce((a, b) => a[1] > b[1] ? a : b)[0] as LearningStyle;
  };

  const getStyleDescription = (style: LearningStyle): string => {
    const descriptions: Record<LearningStyle, string> = {
      visual: '你是視覺型學習者！建議使用圖表、心智圖等視覺化工具來學習。',
      auditory: '你是聽覺型學習者！建議通過討論、錄音等方式來學習。',
      kinesthetic: '你是體驗型學習者！建議通過實作、角色扮演等方式來學習。'
    };
    return descriptions[style];
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const scores = {
      visual: getStyleCount('visual'),
      auditory: getStyleCount('auditory'),
      kinesthetic: getStyleCount('kinesthetic')
    };

    const dominantStyle = getLearningStyle();
    const result = {
      dominantStyle,
      scores,
      timestamp: new Date().toISOString(),
      recommendations: learningRecommendations[dominantStyle]
    };

    const updatedResults = [...savedResults, result];

    // Store results for both history and learning guide
    localStorage.setItem('learningStyleResults', JSON.stringify(updatedResults));
    localStorage.setItem('currentLearningStyle', JSON.stringify({
      visual: scores.visual,
      auditory: scores.auditory,
      kinesthetic: scores.kinesthetic,
      dominantStyle,
      timestamp: new Date().toISOString()
    }));

    setSavedResults(updatedResults);
    setShowResult(true);
    return scores;
  };

  const renderResult = () => {
    const style = getLearningStyle() as LearningStyle;
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">你的學習風格分析結果</h2>
        
        <div className="space-y-4">
          <p className="text-lg">{getStyleDescription(style)}</p>
          
          <div className="space-y-2">
            <h3 className="font-semibold">視覺型學習傾向</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(getStyleCount('visual') / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((getStyleCount('visual') / questions.length) * 100)}%</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">聽覺型學習傾向</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(getStyleCount('auditory') / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((getStyleCount('auditory') / questions.length) * 100)}%</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">體驗型學習傾向</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${(getStyleCount('kinesthetic') / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((getStyleCount('kinesthetic') / questions.length) * 100)}%</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">學習建議</h3>
          <ul className="list-disc list-inside space-y-2">
            {learningRecommendations[getLearningStyle() as LearningStyle].map((recommendation, index) => (
              <li key={index} className="text-gray-700">{recommendation}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setShowResult(false);
            }}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-150"
          >
            重新測試
          </button>
          <button
            onClick={() => setShowShareOptions(true)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-150"
          >
            分享結果
          </button>
          <Link
            href="/learning-guide"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150"
          >
            開始制定學習計畫
          </Link>
          {showShareOptions && (
            <ShareDialog 
              onClose={() => setShowShareOptions(false)}
              learningStyle={getLearningStyle() as LearningStyle}
              scores={{
                visual: getStyleCount('visual'),
                auditory: getStyleCount('auditory'),
                kinesthetic: getStyleCount('kinesthetic')
              }}
            />
          )}
        </div>

        {savedResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">測試紀錄</h3>
            <div className="space-y-4">
              {savedResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="font-semibold">
                    主要學習風格: {result.dominantStyle === 'visual' ? '視覺型' : result.dominantStyle === 'auditory' ? '聽覺型' : '體驗型'}
                  </p>
                  <p className="text-sm text-gray-600">
                    測試時間: {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTest = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">學習風格測驗</h2>
          <p className="text-gray-600">
            回答下列問題，了解你的學習風格。
          </p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-right">
            問題 {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">{questions[currentQuestion].text}</h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition duration-150"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showResult ? renderResult() : renderTest()}
    </div>
  );
};

export default LearningStyleTest;
