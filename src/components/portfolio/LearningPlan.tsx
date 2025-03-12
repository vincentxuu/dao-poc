import React, { useState } from 'react';
import { UserPortfolio, Milestone } from '../../types/portfolio';

interface LearningPlanProps {
  portfolio: UserPortfolio;
}

export default function LearningPlan({ portfolio }: LearningPlanProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current');
  const { skills } = portfolio;

  // Collect all milestones across skills
  const allMilestones = skills.flatMap(skill => 
    skill.growth?.milestones.map(milestone => ({
      ...milestone,
      skillName: skill.name,
      skillLevel: skill.level
    })) || []
  );

  // Split milestones into current and completed
  const currentMilestones = allMilestones.filter(m => !m.achieved);
  const completedMilestones = allMilestones.filter(m => m.achieved);

  const renderMilestone = (milestone: Milestone & { skillName: string; skillLevel: number }) => (
    <div
      key={milestone.id}
      className={`relative flex items-start space-x-3 ${
        milestone.achieved ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
        <span className="text-sm font-medium text-blue-600">
          {milestone.skillName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900">
          {milestone.title}
        </div>
        {milestone.description && (
          <p className="mt-0.5 text-sm text-gray-500">
            {milestone.description}
          </p>
        )}
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(milestone.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {milestone.skillName}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 self-center">
        {milestone.achieved ? (
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <div className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            學習計畫
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              完成進度：{completedMilestones.length}/{allMilestones.length}
            </span>
            <div className="relative flex items-center w-32 bg-gray-200 rounded-full h-2">
              <div
                className="absolute left-0 h-2 bg-blue-600 rounded-full"
                style={{
                  width: `${(completedMilestones.length / allMilestones.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-1 max-w-2xl text-sm text-gray-500">
          追蹤您的學習目標和里程碑
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('current')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'current'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            進行中 ({currentMilestones.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            已完成 ({completedMilestones.length})
          </button>
        </nav>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {(activeTab === 'current' ? currentMilestones : completedMilestones)
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((milestone, idx) => (
                <li key={milestone.id}>
                  <div className="relative pb-8">
                    {idx !== (activeTab === 'current' ? currentMilestones.length : completedMilestones.length) - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    {renderMilestone(milestone)}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {activeTab === 'current'
              ? '按時間順序顯示待完成的學習目標'
              : '顯示已完成的學習成就'}
          </div>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            新增目標
          </button>
        </div>
      </div>
    </div>
  );
}
