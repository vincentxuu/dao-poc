import { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
  }[];
}

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
  }
];

const LearningStyleTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

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
    setShowResult(true);
  };

  const getStyleCount = (style: string) => {
    return answers.filter(answer => answer === style).length;
  };

  const getLearningStyle = () => {
    const styles = {
      visual: getStyleCount('visual'),
      auditory: getStyleCount('auditory'),
      kinesthetic: getStyleCount('kinesthetic')
    };

    return Object.entries(styles).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const getStyleDescription = (style: string) => {
    const descriptions = {
      visual: '你是視覺型學習者！建議使用圖表、心智圖等視覺化工具來學習。',
      auditory: '你是聽覺型學習者！建議通過討論、錄音等方式來學習。',
      kinesthetic: '你是體驗型學習者！建議通過實作、角色扮演等方式來學習。'
    };
    return descriptions[style as keyof typeof descriptions];
  };

  if (showResult) {
    const style = getLearningStyle();
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">你的學習風格分析結果</h2>
        <div className="mb-8">
          <p className="text-lg mb-4">{getStyleDescription(style)}</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>視覺型學習</span>
              <div className="w-64 h-4 bg-gray-200 rounded-full">
                <div 
                  className="h-4 bg-indigo-600 rounded-full"
                  style={{ width: `${(getStyleCount('visual') / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>聽覺型學習</span>
              <div className="w-64 h-4 bg-gray-200 rounded-full">
                <div 
                  className="h-4 bg-indigo-600 rounded-full"
                  style={{ width: `${(getStyleCount('auditory') / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>體驗型學習</span>
              <div className="w-64 h-4 bg-gray-200 rounded-full">
                <div 
                  className="h-4 bg-indigo-600 rounded-full"
                  style={{ width: `${(getStyleCount('kinesthetic') / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setAnswers([]);
            setShowResult(false);
          }}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150"
        >
          重新測試
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">學習風格測驗</h2>
        <p className="text-gray-600">
          完成這個簡短的測驗，了解你的學習風格偏好。
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">問題 {currentQuestion + 1} / {questions.length}</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 border rounded-md hover:border-indigo-600 hover:bg-indigo-50 transition duration-150"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningStyleTest;
