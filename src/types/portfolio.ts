export type PrivacyLevel = 'public' | 'private' | 'connections';

export type MediaType = 
  | 'image' 
  | 'video' 
  | 'document' 
  | 'code' 
  | 'presentation' 
  | 'figma' 
  | 'github' 
  | 'notion';

export type LearningItemType = 'course' | 'project' | 'note' | 'research' | 'internship' | 'achievement' | 'milestone';

export type PortfolioTemplate = 'minimal' | 'creative' | 'professional' | 'technical';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description?: string;
  achieved: boolean;
  relatedItems?: string[];
  type?: 'skill' | 'project' | 'achievement';
}
export interface Feedback {
  id: string;
  userId: string;
  content: string;
  rating?: number;
  createdAt: string;
}
export interface LearningItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'note' | 'research' | 'internship';
  date: string;
  tags: string[];
  skills: string[];
  technologies?: string[];
  learningJourney?: string;
  privacy: PrivacyLevel;
  content: {
    text?: string;
    media?: {
      type: MediaType;
      url: string;
      title?: string;
      previewUrl?: string;
      embedCode?: string;
    }[];
    milestones?: Milestone[];
    links?: {
      github?: string;
      notion?: string;
      figma?: string;
      live?: string;
    };
  };
  achieved: boolean;
  relatedItems?: string[];
  collaborators?: string[];
  feedback?: {
    id: string;
    userId: string;
    content: string;
    rating?: number;
    createdAt: string;
  }[];
  interactions?: {
    bookmarks: number;
    comments: number;
    collaborationRequests: number;
  };
  exportFormats?: ('pdf' | 'html' | 'markdown')[];
}

export interface PortfolioView {
  type: 'grid' | 'timeline' | 'detailed';
  template?: PortfolioTemplate;
  filters?: {
    tags?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
    skills?: string[];
    type?: LearningItem['type'][];
    privacy?: PrivacyLevel[];
  };
  layout?: {
    columns?: number;
    showMilestones?: boolean;
    showInteractions?: boolean;
    showCollaborators?: boolean;
    showProgress?: boolean;
  };
}

export interface UserPortfolio {
  userId: string;
  items: LearningItem[];
  currentView: PortfolioView;
  skills: {
    name: string;
    level: number;
    relatedItems: string[];
    growth?: {
      startDate: string;
      milestones: Milestone[];
      endorsements: number;
    };
  }[];
  stats: {
    totalItems: number;
    skillCount: number;
    collaborationCount: number;
    topSkills: string[];
    learningProgress: {
      completedMilestones: number;
      totalMilestones: number;
      activeProjects: number;
    };
    interactions: {
      totalBookmarks: number;
      totalComments: number;
      totalCollaborationRequests: number;
    };
  };
  sharing: {
    socialLinks: {
      platform: 'linkedin' | 'twitter' | 'github' | 'facebook';
      url: string;
    }[];
    customDomain?: string;
    seoSettings?: {
      title: string;
      description: string;
      keywords: string[];
    };
    exportFormats?: ('pdf' | 'html' | 'json' | 'markdown')[];
    autoShare?: {
      platforms: ('twitter' | 'linkedin')[];
      frequency: 'daily' | 'weekly' | 'monthly' | 'onAchievement';
    };
  };
  learningTimeline?: {
    milestones: {
      id: string;
      date: string;
      title: string;
      description: string;
      type: 'skill' | 'project' | 'achievement';
      relatedItems: string[];
    }[];
    progress: {
      startDate: string;
      currentPhase: string;
      completedItems: number;
      totalItems: number;
      nextMilestone?: string;
    };
  };
}
