import { PortfolioProject } from '@/types/portfolio/Portfolio';

export const demoProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'AI 驅動的智慧學習助手',
    description: '開發一個基於人工智能的學習助手，能夠根據用戶的學習風格和進度提供個性化的學習建議和資源推薦。運用了自然語言處理和機器學習技術，實現了智能對話和學習路徑規劃功能。',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'TypeScript'],
    learningJourney: `在這個項目中，我經歷了以下學習階段：

1. AI模型研究與選擇
- 研究不同的NLP模型架構
- 評估各種開源模型的性能
- 選定並優化適合的模型

2. 系統架構設計
- 設計可擴展的微服務架構
- 實現實時對話系統
- 建立用戶數據分析pipeline

3. 前端開發與優化
- 實現響應式界面
- 優化用戶交互體驗
- 實現數據可視化`,
    links: {
      github: 'https://github.com/example/ai-learning-assistant',
      notion: 'https://notion.so/ai-learning-assistant',
      live: 'https://ai-learning-assistant.example.com'
    },
    mediaUrls: [
      '/images/portfolio/ai-assistant-1.jpg',
      '/images/portfolio/ai-assistant-2.jpg'
    ],
    embedUrl: 'https://www.youtube.com/embed/demo1',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-03-01T00:00:00Z'
  },
  {
    id: '2',
    title: '區塊鏈學習成果認證系統',
    description: '設計並實現了一個基於區塊鏈技術的學習成果認證系統，讓學習者的技能認證和學習歷程可以被安全地記錄和驗證。該系統支持多種認證類型，並提供了便捷的驗證接口。',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'MongoDB'],
    learningJourney: `這個項目讓我深入學習了區塊鏈技術：

1. 智能合約開發
- 學習Solidity語言
- 理解ERC標準
- 實現安全的合約邏輯

2. Web3集成
- 前端與區塊鏈交互
- 錢包集成
- Gas優化

3. 去中心化存儲
- IPFS實現
- 數據加密
- 訪問控制`,
    links: {
      github: 'https://github.com/example/blockchain-cert',
      figma: 'https://figma.com/blockchain-cert',
      live: 'https://blockchain-cert.example.com'
    },
    mediaUrls: [
      '/images/portfolio/blockchain-1.jpg',
      '/images/portfolio/blockchain-2.jpg'
    ],
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-03-10T00:00:00Z'
  },
  {
    id: '3',
    title: '協作式學習平台',
    description: '開發了一個支持實時協作的在線學習平台，讓學習者可以一起討論問題、分享資源、進行項目協作。平台整合了視頻會議、文檔協作、代碼協作等功能。',
    technologies: ['Next.js', 'Socket.io', 'WebRTC', 'Redis', 'PostgreSQL'],
    learningJourney: `在開發這個平台的過程中，我學習了：

1. 實時通訊技術
- WebSocket實現
- 視頻流處理
- 狀態同步機制

2. 分佈式系統
- 負載均衡
- 快取策略
- 系統監控

3. 協作功能實現
- 即時文檔編輯
- 代碼實時同步
- 權限管理系統`,
    links: {
      github: 'https://github.com/example/collab-learning',
      notion: 'https://notion.so/collab-learning',
      figma: 'https://figma.com/collab-learning'
    },
    mediaUrls: [
      '/images/portfolio/collab-1.jpg',
      '/images/portfolio/collab-2.jpg'
    ],
    embedUrl: 'https://www.youtube.com/embed/demo2',
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-03-15T00:00:00Z'
  }
];
