import React, { useState } from 'react';
import Head from 'next/head';
import { Portfolio } from '@/components/portfolio/Portfolio';
import { UserPortfolio, PortfolioView, LearningItem } from '@/types/portfolio';
import { demoProjects } from '@/data/demoPortfolio';
import { TemplateProvider, useTemplate } from '@/components/portfolio/TemplateContext';
import LearningProgress from '@/components/portfolio/LearningProgress';
import TemplateCard from '@/components/portfolio/TemplateCard';
import GridView from '@/components/portfolio/GridView';
import { ViewIcon, TimelineIcon, DetailIcon } from '@/components/icons';
import TemplateSelector from '@/components/portfolio/TemplateSelector';
import SkillsView from '@/components/portfolio/SkillsView';
import ProjectView from '@/components/portfolio/ProjectView';
import SocialView from '@/components/portfolio/SocialView';
import DetailView from '@/components/portfolio/DetailView';
import LearningPlan from '@/components/portfolio/LearningPlan';
import AddPortfolioItemForm from '@/components/portfolio/AddPortfolioItemForm';
const samplePortfolio: UserPortfolio = {
  userId: 'user1',
  currentView: {
    type: 'grid',
    template: 'creative',
    layout: {
      columns: 3,
      showMilestones: true,
      showInteractions: true,
      showCollaborators: true,
      showProgress: true
    }
  },
  items: [
    {
      id: '1',
      title: 'React Development Journey',
      description: 'Learning and mastering React development',
      date: '2025-01-15',
      type: 'course',
      tags: ['React', 'Frontend', 'Web Development'],
      skills: ['React'],
      privacy: 'public',
      achieved: true,
      relatedItems: ['1'],
      content: {
        media: [{
          type: 'image',
          url: '/images/react-project.jpg',
          title: 'React Project Screenshot'
        }]
      },
      collaborators: ['Alice', 'Bob'],
      feedback: [{
        id: 'f1',
        userId: 'user2',
        content: 'Great progress!',
        rating: 5,
        createdAt: '2025-01-16'
      }]
    },
    {
      id: '2',
      title: 'Data Analysis Project',
      description: 'Smart city data analysis project',
      date: '2025-03-01',
      type: 'project',
      tags: ['Python', 'Data Analysis', 'Smart City'],
      skills: ['Python', 'Data Analysis'],
      privacy: 'public',
      content: {
        media: [{
          type: 'image',
          url: '/images/data-analysis.jpg',
          title: 'Data Analysis Results'
        }]
      },
      collaborators: ['Charlie', 'David'],
      feedback: [{
        id: 'f2',
        userId: 'user3',
        content: 'Excellent analysis!',
        rating: 4,
        createdAt: '2025-03-02'
      }]
    }
  ],
  stats: {
    totalItems: 2,
    skillCount: 4,
    collaborationCount: 4,
    topSkills: ['React', 'TypeScript', 'Python', '數據分析'],
    learningProgress: {
      completedMilestones: 2,
      totalMilestones: 4,
      activeProjects: 1
    },
    interactions: {
      totalBookmarks: 5,
      totalComments: 2,
      totalCollaborationRequests: 1
    }
  },
  sharing: {
    socialLinks: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/example'
      },
      {
        platform: 'github',
        url: 'https://github.com/example'
      }
    ],
    seoSettings: {
      title: '我的學習歷程與作品集',
      description: '展示我在前端開發與數據分析領域的學習成長',
      keywords: ['前端開發', 'React', 'Python', '數據分析']
    },
    exportFormats: ['pdf', 'html', 'json', 'markdown'],
    autoShare: {
      platforms: ['twitter', 'linkedin'],
      frequency: 'onAchievement'
    }
  },
  skills: [
    {
      name: 'React',
      level: 4,
      relatedItems: ['1'],
      growth: {
        startDate: '2025-01-01',
        milestones: [
          {
            id: 'm1',
            title: 'Started Learning React',
            date: '2025-01-15',
            description: 'Began the journey of mastering React development',
            achieved: true,
            relatedItems: ['1'],
            type: 'skill'
          }
        ],
        endorsements: 2
      }
    },
    {
      name: 'Data Analysis',
      level: 3,
      relatedItems: ['2'],
      growth: {
        startDate: '2025-02-01',
        milestones: [
          {
            id: 'm2',
            title: 'First Data Analysis Project',
            date: '2025-03-01',
            description: 'Successfully completed the smart city data analysis project',
            achieved: true,
            relatedItems: ['2'],
            type: 'project'
          }
        ],
        endorsements: 1
      }
    }
  ],
  learningTimeline: {
    milestones: [
      {
        id: 'm1',
        date: '2025-01-15',
        title: 'Started Learning React',
        description: 'Began the journey of mastering React development',
        type: 'skill',
        relatedItems: ['1']
      },
      {
        id: 'm2',
        date: '2025-03-01',
        title: 'First Data Analysis Project',
        description: 'Successfully completed the smart city data analysis project',
        type: 'project',
        relatedItems: ['2']
      }
    ],
    progress: {
      startDate: '2025-01-01',
      currentPhase: 'Learning React and Data Analysis',
      completedItems: 2,
      totalItems: 4,
      nextMilestone: 'm3'
    }
  }
};

function PortfolioPage() {
  return (
    <TemplateProvider template="creative">
      <PortfolioContent />
    </TemplateProvider>
  );
}

function PortfolioContent() {
  const [currentView, setCurrentView] = useState<PortfolioView>({ 
    type: 'grid',
    template: 'creative',
    layout: {
      columns: 3,
      showMilestones: true,
      showInteractions: true,
      showCollaborators: true,
      showProgress: true
    }
  });
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const { template, styles, setTemplate } = useTemplate();
  const [selectedItem, setSelectedItem] = useState<LearningItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className={`min-h-screen ${styles.container}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 flex items-start justify-between ${styles.header} p-6`}>
          <div>
            <h1 className={styles.title}>學習作品集</h1>
            <p className={`mt-2 text-sm ${styles.subtitle}`}>
              展示您的學習歷程、技能成長與專業成就
            </p>
          </div>
          <button
            onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${styles.button} ${showTemplateSelector ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            {showTemplateSelector ? '關閉選擇器' : '選擇作品集風格'}
          </button>
        </div>

        {showTemplateSelector && (
          <div className="mb-8 animate-fadeIn bg-gray-800/95 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-xl">
            <TemplateSelector
              currentTemplate={template}
              onTemplateChange={(newTemplate) => {
                setTemplate(newTemplate);
              }}
            />
          </div>
        )}

        <div className={`${styles.nav} p-1`}>
          <div className="flex space-x-1">
            {[
              { type: 'grid', name: '網格視角', icon: ViewIcon } as const,
              { type: 'timeline', name: '時間軸', icon: TimelineIcon } as const,
              { type: 'detailed', name: '詳細視角', icon: DetailIcon } as const,
            ].map((view) => (
              <button
                key={view.type}
                onClick={() => setCurrentView({ ...currentView, type: view.type })}
                className={`flex items-center space-x-2 flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none
                  ${currentView.type === view.type
                    ? 'bg-blue-100 text-blue-700 shadow'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {view.icon()}
                <span>{view.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`${styles.card} p-6`}>
              <LearningProgress portfolio={samplePortfolio} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {currentView.type === 'grid' && (
              <TemplateCard>
                <h2 className={`text-xl font-semibold mb-4 ${styles.title}`}>網格視角</h2>
                <GridView items={samplePortfolio.items} onItemClick={setSelectedItem} />
              </TemplateCard>
            )}
            {currentView.type === 'timeline' && (
              <TemplateCard>
                <h2 className={`text-xl font-semibold mb-4 ${styles.title}`}>時間軸視角</h2>
                <div className="space-y-4">
                  {samplePortfolio.items
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-500">
                            {item.feedback.reduce((acc, f) => acc + (f.rating || 0), 0) / item.feedback.length} 評價
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.collaborators.length} 協作者
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="mt-4">
                    <Portfolio
                      portfolio={samplePortfolio}
                      onInteraction={(type, itemId) => {
                        // Handle interactions based on type (bookmark/comment)
                        const item = samplePortfolio.items.find(i => i.id === itemId);
                        if (item) {
                          if (type === 'bookmark') {
                            item.interactions = {
                              ...item.interactions,
                              bookmarks: (item.interactions?.bookmarks || 0) + 1
                            };
                          } else if (type === 'comment') {
                            setSelectedItem(item); // Open detail view for commenting
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </TemplateCard>
            )}
            {currentView.type === 'detailed' && (
              <TemplateCard>
                <h2 className={`text-xl font-semibold mb-4 ${styles.title}`}>詳細視角</h2>
                <div className="space-y-6">
                  {samplePortfolio.items.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">使用技術</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.learningJourney && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">學習歷程</h4>
                          <p className="text-gray-600">{item.learningJourney}</p>
                        </div>
                      )}
                      {item.content.links && (
                        <div className="flex gap-4">
                          {item.content.links.github && (
                            <a href={item.content.links.github} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800">GitHub</a>
                          )}
                          {item.content.links.notion && (
                            <a href={item.content.links.notion} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:text-blue-800">Notion</a>
                          )}
                          {item.content.links.figma && (
                            <a href={item.content.links.figma} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:text-blue-800">Figma</a>
                          )}
                          {item.content.links.live && (
                            <a href={item.content.links.live} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:text-blue-800">Live Demo</a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TemplateCard>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`${styles.card} p-6`}>
              <LearningPlan portfolio={samplePortfolio} />
            </div>
          </div>
        </div>

        <div className={`mt-8 ${styles.card} p-6`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">新增學習經歷</h2>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              新增項目
            </button>
          </div>
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <AddPortfolioItemForm
                  onSubmit={(item) => {
                    // Handle form submission
                    const newItem = {
                      ...item,
                      id: `item-${Date.now()}`,
                      feedback: [],
                      collaborators: [],
                      interactions: {
                        bookmarks: 0,
                        comments: 0,
                        collaborationRequests: 0
                      }
                    };
                    // Add the new item to the portfolio
                    samplePortfolio.items.push(newItem);
                    setShowAddForm(false);
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <DetailView
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddFeedback={(feedback) => {
            // Handle add feedback logic here
          }}
        />
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">新增作品</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <AddPortfolioItemForm onSubmit={(newItem) => {
                // Handle add item logic here
                setShowAddForm(false);
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;