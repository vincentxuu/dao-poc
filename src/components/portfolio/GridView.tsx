import { LearningItem } from '../../types/portfolio';

interface GridViewProps {
  items: LearningItem[];
  onItemClick: (item: LearningItem) => void;
}

const GridView = ({ items, onItemClick }: GridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          {item.content.media[0] && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.content.media[0].url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                {item.type}
              </span>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {item.collaborators.slice(0, 3).map((collaborator, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                    title={collaborator}
                  >
                    <span className="text-xs text-gray-600">
                      {collaborator.charAt(0)}
                    </span>
                  </div>
                ))}
                {item.collaborators.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      +{item.collaborators.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 01.832.445l1.878 2.682 2.812.815a1 1 0 01.553 1.705l-2.047 1.995.483 2.813a1 1 0 01-1.451 1.054L10 12.005l-2.56 1.346a1 1 0 01-1.451-1.054l.483-2.813-2.047-1.995a1 1 0 01.553-1.705l2.812-.815L9.168 2.445A1 1 0 0110 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {item.feedback.reduce((acc, f) => acc + f.rating, 0) / item.feedback.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {item.feedback.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
