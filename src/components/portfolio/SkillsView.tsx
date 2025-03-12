import { UserPortfolio } from '../../types/portfolio';

interface SkillsViewProps {
  portfolio: UserPortfolio;
}

export default function SkillsView({ portfolio }: SkillsViewProps) {
  const maxLevel = 5; // Maximum skill level

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            技能概覽
          </h3>
          <div className="space-y-4">
            {portfolio.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">Level {skill.level}/{maxLevel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(skill.level / maxLevel) * 100}%` }}
                  />
                </div>
                <div className="mt-1">
                  <span className="text-xs text-gray-500">
                    {skill.relatedItems.length} 個相關項目
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            學習統計
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {portfolio.stats.skillCount}
              </div>
              <div className="text-sm text-gray-500">已掌握技能</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {portfolio.stats.totalItems}
              </div>
              <div className="text-sm text-gray-500">學習項目</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {portfolio.stats.collaborationCount}
              </div>
              <div className="text-sm text-gray-500">協作專案</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {portfolio.stats.topSkills.length}
              </div>
              <div className="text-sm text-gray-500">專長領域</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">熱門技能</h3>
        <div className="flex flex-wrap gap-2">
          {portfolio.stats.topSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">技能關聯</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.skills.map((skill) => (
            <div key={skill.name} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{skill.name}</h4>
              <div className="text-sm text-gray-500">
                相關項目：
                <ul className="list-disc list-inside mt-1">
                  {skill.relatedItems.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {skill.relatedItems.length > 3 && (
                    <li>...還有 {skill.relatedItems.length - 3} 個項目</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
