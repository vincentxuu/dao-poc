import { LearningItem } from '../../types/portfolio';
import { format } from 'date-fns';

interface SocialViewProps {
  items: LearningItem[];
}

export default function SocialView({ items }: SocialViewProps) {
  const socialItems = items.filter(item => 
    (item.collaborators && item.collaborators.length > 0) || 
    (item.feedback && item.feedback.length > 0)
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          協作概覽
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {socialItems.length}
            </div>
            <div className="text-sm text-gray-500">協作項目</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {new Set(socialItems.flatMap(item => item.collaborators || [])).size}
            </div>
            <div className="text-sm text-gray-500">協作夥伴</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {socialItems.reduce((sum, item) => sum + (item.feedback?.length || 0), 0)}
            </div>
            <div className="text-sm text-gray-500">收到的回饋</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {socialItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(item.date), 'yyyy/MM/dd')}
                </div>
              </div>

              {item.collaborators && item.collaborators.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    協作夥伴
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.collaborators.map((collaborator, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {collaborator}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.feedback && item.feedback.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    回饋與評價
                  </div>
                  <div className="space-y-4">
                    {item.feedback.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-900">
                              {feedback.content}
                            </div>
                            <div className="mt-2 flex items-center">
                              <div className="flex items-center">
                                {feedback.rating && (
                                  <div className="flex items-center mr-2">
                                    <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                      {feedback.rating}
                                    </span>
                                  </div>
                                )}
                                <span className="text-sm text-gray-500">
                                  來自 {feedback.userId}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(feedback.createdAt), 'yyyy/MM/dd')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {socialItems.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">尚無社交互動</h3>
            <p className="mt-1 text-sm text-gray-500">開始與其他學習者協作並分享您的學習成果。</p>
          </div>
        )}
      </div>
    </div>
  );
}
