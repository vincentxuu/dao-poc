import { UserPortfolio } from '../types/portfolio';

export const samplePortfolio: UserPortfolio = {
  userId: 'user123',
  items: [
    {
      id: '1',
      title: 'React 進階開發實戰',
      description: '學習 React 的高級特性和最佳實踐，包括 Hooks、Context API 和性能優化',
      type: 'course',
      date: '2025-02-15',
      tags: ['前端開發', 'React', 'JavaScript'],
      skills: ['React', 'TypeScript', '前端效能優化'],
      privacy: 'public',
      content: {
        text: '深入學習了 React 的進階特性，包括自定義 Hooks、Context API 和性能優化技巧',
        media: [
          {
            type: 'image',
            url: '/portfolio/react-advanced.jpg',
            title: 'React 課程認證'
          }
        ]
      },
      collaborators: ['Alice Chen'],
      interactions: {
        bookmarks: 5,
        comments: 2,
        collaborationRequests: 1
      },
      achieved: true
    },
    {
      id: '2',
      title: '智慧城市數據分析專案',
      description: '運用機器學習和大數據分析技術，為智慧城市建設提供決策支持',
      type: 'project',
      date: '2025-03-01',
      tags: ['數據分析', '機器學習', '智慧城市'],
      skills: ['Python', 'TensorFlow', '數據視覺化'],
      privacy: 'public',
      content: {
        text: '開發了智慧城市數據分析系統，包括交通流量預測和環境監測分析',
        media: [
          {
            type: 'github',
            url: 'https://github.com/example/smart-city',
            title: '專案代碼'
          }
        ]
      },
      collaborators: ['Bob Wang'],
      interactions: {
        bookmarks: 8,
        comments: 3,
        collaborationRequests: 2
      },
      achieved: true
    }
  ],
  currentView: {
    type: 'grid',
    template: 'minimal',
    layout: {
      showMilestones: true,
      showInteractions: true,
      showCollaborators: true,
      showProgress: true,
      columns: 2
    }
  },
  stats: {
    totalItems: 2,
    skillCount: 6,
    collaborationCount: 2,
    topSkills: ['React', 'Python', 'TypeScript', '數據分析'],
    learningProgress: {
      completedMilestones: 2,
      totalMilestones: 4,
      activeProjects: 1
    },
    interactions: {
      totalBookmarks: 13,
      totalComments: 5,
      totalCollaborationRequests: 3
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
            title: '完成 React 進階課程',
            date: '2025-02-15',
            description: '掌握 React 高級特性和最佳實踐',
            achieved: true,
            relatedItems: ['1'],
            type: 'skill'
          }
        ],
        endorsements: 2
      }
    },
    {
      name: 'Python',
      level: 3,
      relatedItems: ['2'],
      growth: {
        startDate: '2025-02-01',
        milestones: [
          {
            id: 'm2',
            title: '完成智慧城市專案',
            date: '2025-03-01',
            description: '成功開發智慧城市數據分析系統',
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
        id: 'ms1',
        date: '2025-02-15',
        title: 'React 進階開發實戰完成',
        description: '完成 React 高級特性和最佳實踐課程',
        type: 'skill',
        relatedItems: ['1']
      },
      {
        id: 'ms2',
        date: '2025-03-01',
        title: '智慧城市數據分析專案完成',
        description: '成功完成智慧城市數據分析專案',
        type: 'project',
        relatedItems: ['2']
      }
    ],
    progress: {
      startDate: '2025-01-01',
      currentPhase: '技能提升階段',
      completedItems: 2,
      totalItems: 4,
      nextMilestone: '前端框架掌握'
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
      platforms: ['linkedin'],
      frequency: 'onAchievement'
    }
  }
};
