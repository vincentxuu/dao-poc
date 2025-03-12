import React from 'react';
import { PortfolioProject } from '@/types/portfolio/Portfolio';
import { format } from 'date-fns';
import {
  GlobeAltIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

interface ProjectTimelineProps {
  projects: PortfolioProject[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects }) => {
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-12">
        {sortedProjects.map((project) => (
          <div key={project.id} className="relative pl-12">
            {/* Timeline dot */}
            <div className="absolute left-2.5 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-4 border-white" />
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {format(new Date(project.createdAt), 'yyyy年MM月dd日')}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                
                {project.mediaUrls?.[0] && (
                  <div className="relative h-48 mb-4">
                    <img
                      src={project.mediaUrls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {project.learningJourney && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">學習歷程</h4>
                    <p className="text-gray-600">{project.learningJourney}</p>
                  </div>
                )}

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

                <div className="flex gap-4">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.links?.notion && (
                    <a
                      href={project.links.notion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <DocumentTextIcon className="w-5 h-5" />
                      <span>Notion</span>
                    </a>
                  )}
                  {project.links?.figma && (
                    <a
                      href={project.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                      <span>Figma</span>
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <GlobeAltIcon className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
