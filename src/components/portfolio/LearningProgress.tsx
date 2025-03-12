import React from 'react';
import { UserPortfolio, Milestone } from '../../types/portfolio';

interface LearningProgressProps {
  portfolio: UserPortfolio;
}

export default function LearningProgress({ portfolio }: LearningProgressProps) {
  const { stats, skills } = portfolio;
  const allMilestones = skills.flatMap(skill => skill.growth?.milestones || []);
  const sortedMilestones = allMilestones.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">學習進度概覽</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 text-2xl font-semibold">
              {stats.learningProgress.completedMilestones} / {stats.learningProgress.totalMilestones}
            </div>
            <div className="text-sm text-blue-600">已完成里程碑</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 text-2xl font-semibold">
              {stats.learningProgress.activeProjects}
            </div>
            <div className="text-sm text-green-600">進行中專案</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 text-2xl font-semibold">
              {stats.skillCount}
            </div>
            <div className="text-sm text-purple-600">已掌握技能</div>
          </div>
        </div>
      </div>

      {/* Skill Growth */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">技能成長</h3>
        <div className="space-y-4">
          {skills.map(skill => (
            <div key={skill.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-500">
                    自 {new Date(skill.growth?.startDate || '').toLocaleDateString()} 開始學習
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {skill.growth?.endorsements || 0} 個推薦
                  </span>
                </div>
              </div>
              
              {/* Skill Level */}
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    Level {skill.level}/5
                  </span>
                </div>
              </div>

              {/* Milestones */}
              {skill.growth?.milestones && skill.growth.milestones.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">里程碑</h5>
                  <div className="space-y-2">
                    {skill.growth.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`flex items-center p-3 rounded-lg border ${
                          milestone.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex-1">
                          <h6 className="text-sm font-medium text-gray-900">{milestone.title}</h6>
                          {milestone.description && (
                            <p className="mt-1 text-sm text-gray-500">{milestone.description}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-400">{milestone.date}</p>
                        </div>
                        {milestone.achieved && (
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Milestones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">最近里程碑</h3>
        <div className="space-y-4">
          {sortedMilestones.slice(0, 5).map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200"
            >
              <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {milestone.title}
                </p>
                {milestone.description && (
                  <p className="text-sm text-gray-500 truncate">
                    {milestone.description}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {new Date(milestone.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
