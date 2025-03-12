export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  learningJourney?: string;
  links?: {
    github?: string;
    notion?: string;
    figma?: string;
    live?: string;
  };
  mediaUrls?: string[];
  embedUrl?: string;
  feedback?: {
    comments: string[];
    rating?: number;
    lastUpdated: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioData {
  projects: PortfolioProject[];
  displayMode: 'grid' | 'timeline' | 'detailed';
}
