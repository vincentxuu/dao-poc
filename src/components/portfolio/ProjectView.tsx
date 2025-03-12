import { useState } from 'react';
import { LearningItem } from '../../types/portfolio';
import InteractiveEmbed from './InteractiveEmbed';
import SocialInteractions from './SocialInteractions';
import ExportOptions from './ExportOptions';

interface ProjectViewProps {
  items: LearningItem[];
}

export default function ProjectView({ items }: ProjectViewProps) {
  const projects = items.filter(item => item.type === 'project');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showExport, setShowExport] = useState<string | null>(null);

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    console.log('Bookmark clicked');
  };

  const handleComment = () => {
    // TODO: Implement comment functionality
    console.log('Comment clicked');
  };

  const handleCollaborate = () => {
    // TODO: Implement collaboration functionality
    console.log('Collaborate clicked');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            {project.content.media && project.content.media[0] && (
              <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                {project.content.media[0].type === 'image' ? (
                  <img
                    src={project.content.media[0].url}
                    alt={project.title}
                    className="object-cover"
                  />
                ) : project.content.media[0].type === 'video' ? (
                  <video
                    src={project.content.media[0].url}
                    className="object-cover"
                    controls
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-100">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowExport(showExport === project.id ? null : project.id)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                    title="匯出選項"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                    title="顯示詳情"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={selectedProject === project.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {project.collaborators && project.collaborators.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">協作者</h4>
                  <div className="mt-2 flex -space-x-1 overflow-hidden">
                    {project.collaborators.map((collaborator, index) => (
                      <div
                        key={index}
                        className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-gray-600">
                          {collaborator.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.content.media && project.content.media.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">相關資源</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.content.media.map((media, index) => (
                      <a
                        key={index}
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {media.type}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <SocialInteractions
                item={project}
                onBookmark={handleBookmark}
                onComment={handleComment}
                onCollaborate={handleCollaborate}
              />

              {showExport === project.id && (
                <div className="mt-4">
                  <ExportOptions item={project} />
                </div>
              )}

              {selectedProject === project.id && (
                <div className="mt-4 space-y-4">
                  {project.content.milestones && project.content.milestones.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">里程碑</h4>
                      <div className="space-y-2">
                        {project.content.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className={`flex items-center p-3 rounded-lg border ${milestone.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                          >
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-900">{milestone.title}</h5>
                              {milestone.description && (
                                <p className="mt-1 text-sm text-gray-500">{milestone.description}</p>
                              )}
                              <p className="mt-1 text-xs text-gray-400">{milestone.date}</p>
                            </div>
                            {milestone.achieved && (
                              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.content.media && project.content.media.some(m => ['figma', 'github', 'notion'].includes(m.type)) && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">互動展示</h4>
                      <div className="space-y-4">
                        {project.content.media
                          .filter(m => ['figma', 'github', 'notion'].includes(m.type))
                          .map((media, index) => (
                            <InteractiveEmbed
                              key={index}
                              type={media.type}
                              url={media.url}
                              embedCode={media.embedCode}
                              previewUrl={media.previewUrl}
                            />
                          ))}
                      </div>
                    </div>
                  )}

                  {project.feedback && project.feedback.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        回饋 ({project.feedback.length})
                      </h4>
                      <div className="mt-2 space-y-2">
                        {project.feedback.map((feedback) => (
                          <div key={feedback.id} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p>"{feedback.content}"</p>
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                              <span>評分: {feedback.rating}/5</span>
                              <span>{feedback.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">尚無專案</h3>
          <p className="mt-1 text-sm text-gray-500">開始建立您的第一個專案。</p>
        </div>
      )}
    </div>
  );
}
