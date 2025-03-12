import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import AIRecommendations from '../components/learning/AIRecommendations';

interface LearningGoal {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: number; // hours per week
  deadline?: string;
}

interface LearningPlan {
  id: string;
  goal: LearningGoal;
  milestones: Milestone[];
  resources: Resource[];
  progress: number;
  createdAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'book';
  url: string;
  completed: boolean;
}

const LearningGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'style' | 'goal' | 'plan' | 'track'>('style');
  const [learningStyle, setLearningStyle] = useState<{
    visual: number;
    auditory: number;
    kinesthetic: number;
    dominantStyle: 'visual' | 'auditory' | 'kinesthetic';
    timestamp: string;
  } | null>(null);
  const [learningGoal, setLearningGoal] = useState<LearningGoal | null>(null);
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>(null);

  useEffect(() => {
    // Check if we have learning style results
    const savedStyle = localStorage.getItem('currentLearningStyle');
    if (savedStyle) {
      const styleData = JSON.parse(savedStyle);
      setLearningStyle(styleData);
      // If we have recent results (within last hour), skip to goal setting
      const resultTime = new Date(styleData.timestamp).getTime();
      const oneHourAgo = Date.now() - 60 * 60 * 1000;
      if (resultTime > oneHourAgo) {
        setCurrentStep('goal');
      }
    }
  }, []);

  const generateLearningPlan = (goal: LearningGoal): LearningPlan => {
    if (!learningStyle) return null;

    // 根據學習風格生成個性化里程碑
    const getMilestones = (): Milestone[] => {
      const baseDeadline = Date.now();
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      
      switch (learningStyle.dominantStyle) {
        case 'visual':
          return [
            {
              id: '1',
              title: '建立知識地圖',
              description: '使用心智圖和流程圖理解基礎概念',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + weekInMs).toISOString(),
            },
            {
              id: '2',
              title: '視覺化實踐',
              description: '通過圖表和圖表展示學習成果',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 2 * weekInMs).toISOString(),
            },
            {
              id: '3',
              title: '視覺展示項目',
              description: '製作一個視覺化的展示或展示板',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 3 * weekInMs).toISOString(),
            },
          ];
        case 'auditory':
          return [
            {
              id: '1',
              title: '口述理解',
              description: '通過討論和口述方式掌握基礎知識',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + weekInMs).toISOString(),
            },
            {
              id: '2',
              title: '小組討論',
              description: '參與小組討論並分享學習心得',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 2 * weekInMs).toISOString(),
            },
            {
              id: '3',
              title: '口頭報告',
              description: '準備並展示口頭報告或演講',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 3 * weekInMs).toISOString(),
            },
          ];
        case 'kinesthetic':
          return [
            {
              id: '1',
              title: '動手實踐',
              description: '通過實際操作學習基礎技能',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + weekInMs).toISOString(),
            },
            {
              id: '2',
              title: '小型項目',
              description: '完成一個實踐性的小型項目',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 2 * weekInMs).toISOString(),
            },
            {
              id: '3',
              title: '實戰項目',
              description: '開發一個完整的實戰項目',
              status: 'pending' as const,
              deadline: new Date(baseDeadline + 3 * weekInMs).toISOString(),
            },
          ];
      }
    };

    // 根據學習風格生成推薦資源
    const getResources = (): Resource[] => {
      switch (learningStyle.dominantStyle) {
        case 'visual':
          return [
            {
              id: '1',
              title: '視覺化教程',
              type: 'video' as const,
              url: `https://example.com/${goal.topic}/visual-course`,
              completed: false,
            },
            {
              id: '2',
              title: '互動式圖表學習',
              type: 'course' as const,
              url: `https://example.com/${goal.topic}/interactive-diagrams`,
              completed: false,
            },
            {
              id: '3',
              title: '圖解指南',
              type: 'article' as const,
              url: `https://example.com/${goal.topic}/visual-guide`,
              completed: false,
            },
          ];
        case 'auditory':
          return [
            {
              id: '1',
              title: '音频課程',
              type: 'video' as const,
              url: `https://example.com/${goal.topic}/audio-course`,
              completed: false,
            },
            {
              id: '2',
              title: '專家討論會',
              type: 'course' as const,
              url: `https://example.com/${goal.topic}/expert-discussions`,
              completed: false,
            },
            {
              id: '3',
              title: '播客系列',
              type: 'video' as const,
              url: `https://example.com/${goal.topic}/podcast-series`,
              completed: false,
            },
          ];
        case 'kinesthetic':
          return [
            {
              id: '1',
              title: '動手實踐指南',
              type: 'article' as const,
              url: `https://example.com/${goal.topic}/hands-on-guide`,
              completed: false,
            },
            {
              id: '2',
              title: '互動實踐工作坊',
              type: 'course' as const,
              url: `https://example.com/${goal.topic}/interactive-workshop`,
              completed: false,
            },
            {
              id: '3',
              title: '實戰項目教學',
              type: 'video' as const,
              url: `https://example.com/${goal.topic}/project-tutorials`,
              completed: false,
            },
          ];
      }
    };

    const plan: LearningPlan = {
      id: Math.random().toString(36).substr(2, 9),
      goal,
      milestones: getMilestones(),
      resources: getResources(),
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    return plan;
  };

  const handleGoalSubmit = (goal: LearningGoal) => {
    setLearningGoal(goal);
    const plan = generateLearningPlan(goal);
    setLearningPlan(plan);
    setCurrentStep('plan');
  };

  const updateMilestoneStatus = (milestoneId: string, status: 'pending' | 'in-progress' | 'completed') => {
    if (!learningPlan) return;

    const updatedMilestones = learningPlan.milestones.map(milestone =>
      milestone.id === milestoneId ? { ...milestone, status } : milestone
    );

    const completedCount = updatedMilestones.filter(m => m.status === 'completed').length;
    const progress = (completedCount / updatedMilestones.length) * 100;

    setLearningPlan({
      ...learningPlan,
      milestones: updatedMilestones,
      progress,
    });
  };

  const toggleResourceCompletion = (resourceId: string) => {
    if (!learningPlan) return;

    const updatedResources = learningPlan.resources.map(resource =>
      resource.id === resourceId ? { ...resource, completed: !resource.completed } : resource
    );

    setLearningPlan({
      ...learningPlan,
      resources: updatedResources,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">AI 學習助手</h1>
          <p className="mt-2 text-gray-600">讓我們一起規劃你的學習之旅</p>
          
          {/* Progress Steps */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${currentStep === 'style' ? 'text-indigo-600' : 'text-gray-500'}`}>
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'style' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'}`}>1</span>
                <span className="ml-2">學習風格</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200" />
              <div className={`flex items-center ${currentStep === 'goal' ? 'text-indigo-600' : 'text-gray-500'}`}>
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'goal' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'}`}>2</span>
                <span className="ml-2">設定目標</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200" />
              <div className={`flex items-center ${currentStep === 'plan' ? 'text-indigo-600' : 'text-gray-500'}`}>
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 'plan' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'}`}>3</span>
                <span className="ml-2">學習計畫</span>
              </div>
            </div>
          </div>
        </div>

        {currentStep === 'style' && (
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">先來了解你的學習風格</h2>
            <p className="text-gray-600 mb-8">完成學習風格測驗，讓我們為你提供更個人化的學習建議</p>
            <Link 
              href="/lab/learning-style-test"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              開始測驗
            </Link>
          </div>
        )}

        {currentStep === 'goal' && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">設定學習目標</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleGoalSubmit({
                topic: formData.get('topic') as string,
                level: formData.get('level') as 'beginner' | 'intermediate' | 'advanced',
                timeCommitment: Number(formData.get('timeCommitment')),
                deadline: formData.get('deadline') as string,
              });
            }}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    學習主題
                  </label>
                  <input
                    type="text"
                    name="topic"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    目標級別
                  </label>
                  <select
                    name="level"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="beginner">入門</option>
                    <option value="intermediate">進階</option>
                    <option value="advanced">專家</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    每週學習時間 (小時)
                  </label>
                  <input
                    type="number"
                    name="timeCommitment"
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    預計完成日期
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  生成學習計畫
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 'plan' && learningPlan && (
          <div className="max-w-4xl mx-auto">
            {learningStyle && (
              <div className="mb-8">
                <AIRecommendations
                  learningStyle={learningStyle}
                  selectedTopic={learningPlan.goal.topic}
                  userLevel={learningPlan.goal.level}
                  timeCommitment={learningPlan.goal.timeCommitment}
                />
              </div>
            )}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">學習計畫概覽</h2>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">總體進度</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round(learningPlan.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 rounded-full h-2"
                    style={{ width: `${learningPlan.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">里程碑</h3>
                  <div className="space-y-4">
                    {learningPlan.milestones.map((milestone) => (
                      <div key={milestone.id} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                        <div className="flex justify-between items-center">
                          <select
                            value={milestone.status}
                            onChange={(e) => updateMilestoneStatus(milestone.id, e.target.value as any)}
                            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="pending">待開始</option>
                            <option value="in-progress">進行中</option>
                            <option value="completed">已完成</option>
                          </select>
                          <span className="text-sm text-gray-500">
                            截止日期: {new Date(milestone.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">推薦資源</h3>
                  <div className="space-y-4">
                    {learningPlan.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <span className="text-sm text-gray-600">{resource.type}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            查看
                          </a>
                          <input
                            type="checkbox"
                            checked={resource.completed}
                            onChange={() => toggleResourceCompletion(resource.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningGuide;
