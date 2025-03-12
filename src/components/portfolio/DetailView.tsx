import { useState } from 'react';
import { LearningItem, Feedback } from '../../types/portfolio';

interface DetailViewProps {
  item: LearningItem;
  onClose: () => void;
  onAddFeedback?: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => void;
}

const DetailView = ({ item, onClose, onAddFeedback }: DetailViewProps) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddFeedback) {
      onAddFeedback({
        userId: 'current-user', // 這裡應該從認證系統獲取
        content: feedbackContent,
        rating
      });
      setShowFeedbackForm(false);
      setFeedbackContent('');
      setRating(5);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {item.type}
            </span>
            <span className="text-gray-500">{item.date}</span>
          </div>

          <p className="text-gray-700 mb-6">{item.description}</p>

          {item.content.media.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {item.content.media.map((media, index) => (
                <div key={index} className="relative aspect-video">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={media.title || `Media ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <iframe
                      src={media.url}
                      title={media.title || `Media ${index + 1}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-2">內容</h3>
            <div className="whitespace-pre-wrap">{item.content.text}</div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">技能</h3>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">標籤</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {item.collaborators.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">合作夥伴</h3>
              <div className="flex flex-wrap gap-2">
                {item.collaborators.map((collaborator, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {collaborator}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">回饋</h3>
              {onAddFeedback && !showFeedbackForm && (
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  新增回饋
                </button>
              )}
            </div>

            {showFeedbackForm && (
              <form onSubmit={handleFeedbackSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    評分
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={`p-2 ${
                          rating >= value ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 01.832.445l1.878 2.682 2.812.815a1 1 0 01.553 1.705l-2.047 1.995.483 2.813a1 1 0 01-1.451 1.054L10 12.005l-2.56 1.346a1 1 0 01-1.451-1.054l.483-2.813-2.047-1.995a1 1 0 01.553-1.705l2.812-.815L9.168 2.445A1 1 0 0110 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    內容
                  </label>
                  <textarea
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    提交
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {item.feedback.map((feedback) => (
                <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                          {feedback.userId.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {feedback.userId}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < feedback.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 01.832.445l1.878 2.682 2.812.815a1 1 0 01.553 1.705l-2.047 1.995.483 2.813a1 1 0 01-1.451 1.054L10 12.005l-2.56 1.346a1 1 0 01-1.451-1.054l.483-2.813-2.047-1.995a1 1 0 01.553-1.705l2.812-.815L9.168 2.445A1 1 0 0110 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{feedback.content}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
