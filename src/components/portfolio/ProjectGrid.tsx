import React from 'react';
import { PortfolioProject } from '@/types/portfolio/Portfolio';
import {
  GlobeAltIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

interface ProjectGridProps {
  projects: PortfolioProject[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const getProjectLinks = (project: PortfolioProject) => {
    const links = [];
    if (project.links?.github) {
      links.push({
        icon: <CodeBracketIcon className="w-5 h-5" />,
        url: project.links.github,
        label: 'GitHub',
      });
    }
    if (project.links?.notion) {
      links.push({
        icon: <DocumentTextIcon className="w-5 h-5" />,
        url: project.links.notion,
        label: 'Notion',
      });
    }
    if (project.links?.figma) {
      links.push({
        icon: <PencilSquareIcon className="w-5 h-5" />,
        url: project.links.figma,
        label: 'Figma',
      });
    }
    if (project.links?.live) {
      links.push({
        icon: <GlobeAltIcon className="w-5 h-5" />,
        url: project.links.live,
        label: 'Live Demo',
      });
    }
    return links;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {project.mediaUrls?.[0] && (
            <div className="relative h-48">
              <img
                src={project.mediaUrls[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.embedUrl && (
              <div className="mb-4">
                <iframe
                  src={project.embedUrl}
                  className="w-full h-64 rounded-lg"
                  allowFullScreen
                />
              </div>
            )}
            <div className="flex gap-3">
              {getProjectLinks(project).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
