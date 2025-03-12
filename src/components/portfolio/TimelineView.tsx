import { LearningItem, UserPortfolio } from '../../types/portfolio';
import { format, parseISO, differenceInDays } from 'date-fns';

interface TimelineViewProps {
  portfolio: UserPortfolio;
  onInteraction?: (type: 'bookmark' | 'comment', itemId: string) => void;
}

export default function TimelineView({ portfolio, onInteraction }: TimelineViewProps) {
  const { items, learningTimeline = { milestones: [], progress: { startDate: new Date().toISOString(), completedItems: 0, totalItems: 0, currentPhase: 'Planning' } } } = portfolio;
  
  // Combine items and milestones for the timeline
  const timelineEvents = [
    ...items.map(item => ({
      id: item.id,
      date: item.date,
      type: 'item' as const,
      data: item
    })),
    ...(learningTimeline?.milestones?.map(milestone => ({
      id: milestone.id,
      date: milestone.date,
      type: 'milestone' as const,
      data: milestone
    })) || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate progress
  const startDate = learningTimeline?.progress?.startDate ? parseISO(learningTimeline.progress.startDate) : new Date();
  const today = new Date();
  const totalDays = differenceInDays(today, startDate);
  const progressPercentage = learningTimeline?.progress ? 
    (learningTimeline.progress.completedItems / learningTimeline.progress.totalItems) * 100 : 0;

  // Define a more flexible type for our icon function
  type IconType = 'milestone' | 'course' | 'project' | 'achievement' | 'note' | 'research' | 'internship';
  
  const getEventIcon = (type: IconType) => {
    switch (type) {
      case 'course':
        return (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'project':
        return (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'milestone':
        return (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'achievement':
      case 'note':
      case 'research':
      case 'internship':
        return (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
    }
  };

  // Helper function to get the background color based on item type
  const getBackgroundColor = (event: typeof timelineEvents[0]) => {
    if (event.type === 'milestone') return 'bg-purple-500';
    
    // Handle different item types
    switch (event.data.type) {
      case 'course': return 'bg-blue-500';
      case 'project': return 'bg-green-500';
      case 'note': return 'bg-yellow-500';
      case 'research': return 'bg-red-500';
      case 'internship': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {learningTimeline.progress.completedItems}
            </div>
            <div className="text-sm text-gray-500">Completed Items</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {totalDays}
            </div>
            <div className="text-sm text-gray-500">Days Learning</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {learningTimeline.progress.currentPhase}
            </div>
            <div className="text-sm text-gray-500">Current Phase</div>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timelineEvents.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timelineEvents.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getBackgroundColor(event)}`}
                  >
                    {getEventIcon(event.type === 'milestone' ? 'milestone' : 
                      (event.data.type as IconType))}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.type === 'milestone' ? (
                        <span className="inline-flex items-center">
                          <span className="mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Milestone
                          </span>
                          {event.data.title}
                        </span>
                      ) : (
                        event.data.title
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {event.type === 'milestone' ? event.data.description : event.data.description}
                    </p>
                    {/* Interaction buttons */}
                    {event.type === 'item' && onInteraction && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => onInteraction('bookmark', event.id)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Bookmark
                        </button>
                        <button
                          onClick={() => onInteraction('comment', event.id)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Comment
                        </button>
                      </div>
                    )}
                    {event.type === 'item' && (
                      <>
                        {event.data.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.data.tags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {event.data.skills.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.data.skills.map(skill => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.date}>
                      {format(new Date(event.date), 'yyyy/MM/dd')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}