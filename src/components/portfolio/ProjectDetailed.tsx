import React from 'react';
import { PortfolioProject } from '@/types/portfolio/Portfolio';
import {
  GlobeAltIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface ProjectDetailedProps {
  project: PortfolioProject;
}

export const ProjectDetailed: React.FC<ProjectDetailedProps> = ({ project }) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>建立於 {format(new Date(project.createdAt), 'yyyy年MM月dd日')}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>最後更新 {format(new Date(project.updatedAt), 'yyyy年MM月dd日')}</span>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      {project.mediaUrls && project.mediaUrls.length > 0 && (
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.mediaUrls.map((url, index) => (
              <div key={index} className="relative h-48">
                <img
                  src={url}
                  alt={`${project.title} - 圖片 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Description */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-3">專案描述</h3>
        <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
      </div>

      {/* Technologies */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-3">使用技術</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Journey */}
      {project.learningJourney && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3">學習歷程</h3>
          <p className="text-gray-600 whitespace-pre-line">{project.learningJourney}</p>
        </div>
      )}

      {/* Embedded Content */}
      {project.embedUrl && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3">互動展示</h3>
          <div className="aspect-video">
            <iframe
              src={project.embedUrl}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Project Links */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-3">相關連結</h3>
        <div className="flex flex-wrap gap-4">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
