import Link from 'next/link';

const LabPage = () => {
  const labFeatures = [
    {
      title: '學習風格測驗',
      description: '了解你的學習偏好，獲得個性化學習建議',
      icon: '🎯',
      href: '/lab/learning-style-test',
    },
    {
      title: 'AI 學習助手',
      description: '透過對話式 AI，制定個人化學習計畫',
      icon: '🤖',
      href: '/lab/ai-assistant',
      comingSoon: true,
    },
    {
      title: '學習追蹤',
      description: '記錄並分析你的學習進度',
      icon: '📊',
      href: '/lab/learning-tracker',
      comingSoon: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">學習實驗室</h1>
        <p className="text-xl text-gray-600">
          探索創新的學習工具，提升你的學習效率
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {labFeatures.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {!feature.comingSoon ? (
              <Link
                href={feature.href}
                className="block p-6 h-full"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ) : (
              <div className="block p-6 h-full opacity-60 cursor-not-allowed">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <span className="inline-block mt-4 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  即將推出
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabPage;
