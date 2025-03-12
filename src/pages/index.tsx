import { NextPage } from 'next';
import Navbar from '../components/layout/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const Home: NextPage = () => {
  const resources = [
    {
      title: '前端開發精選課程',
      category: '線上課程',
      rating: 4.8,
      students: 1200,
      icon: '📱'
    },
    {
      title: '資料結構與演算法指南',
      category: '電子書',
      rating: 4.9,
      students: 800,
      icon: '📚'
    },
    {
      title: 'DevOps 實戰工作坊',
      category: '實戰課程',
      rating: 4.7,
      students: 600,
      icon: '🛠'
    },
    {
      title: 'AI 模型訓練教學',
      category: '影片教學',
      rating: 4.9,
      students: 1500,
      icon: '🤖'
    }
  ];

  const partners = [
    {
      name: 'TechCorp',
      type: '企業合作',
      description: '提供實習和就業機會'
    },
    {
      name: 'StartupHub',
      type: '創業加速器',
      description: '創業資源與指導'
    },
    {
      name: 'Global University',
      type: '學術合作',
      description: '學分認證與證書'
    },
    {
      name: 'Innovation Lab',
      type: '研究機構',
      description: '前沿技術研究'
    }
  ];

  const platformFeatures = [
    {
      title: '個人化學習路徑',
      description: 'AI 分析你的學習風格和目標，打造最適合你的學習計畫',
      icon: '🎯'
    },
    {
      title: '即時專家指導',
      description: '隨時連線業界專家，獲得專業建議和解答',
      icon: '👨‍🏫'
    },
    {
      title: '實戰項目經驗',
      description: '參與真實專案，累積實務經驗',
      icon: '💼'
    },
    {
      title: '學習社群支持',
      description: '加入志同道合的學習夥伴，互相支持與成長',
      icon: '🤝'
    }
  ];

  const learningPaths = [
    {
      title: 'Web 全端開發',
      users: '2,000+',
      duration: '6個月',
      level: '入門到進階',
      image: '/images/web-dev.jpg'
    },
    {
      title: 'AI 應用開發',
      users: '1,500+',
      duration: '8個月',
      level: '中級',
      image: '/images/ai-dev.jpg'
    },
    {
      title: 'UI/UX 設計',
      users: '1,800+',
      duration: '4個月',
      level: '入門',
      image: '/images/ui-design.jpg'
    }
  ];

  const successStories = [
    {
      name: '張小明',
      role: '全端工程師',
      company: 'TechStart',
      image: '/images/success-1.jpg',
      quote: '通過學習島的Web開發路徑，我成功轉職成為全端工程師。這裡不只有優質的課程，更重要的是找到了一群志同道合的夥伴。'
    },
    {
      name: '李美玲',
      role: 'UI 設計師',
      company: 'DesignPro',
      image: '/images/success-2.jpg',
      quote: '學習島的社群氛圍很棒，透過這裡認識的設計師朋友們互相切磋，讓我的設計技能突飛猛進。'
    }
  ];

  const mainFeatures = [
    {
      title: '想法交流',
      description: '分享你的創意想法，尋找志同道合的夥伴',
      href: '/ideas',
      icon: '💡'
    },
    {
      title: '學習揪團',
      description: '找到學習夥伴，一起成長進步',
      href: '/groups',
      icon: '👥'
    },
    {
      title: '學習計畫',
      description: '制定個人化學習路徑，追蹤學習進度',
      href: '/learning-plans',
      icon: '📚'
    },
    {
      title: '作品集展示',
      description: '展示你的學習成果和專業作品',
      href: '/portfolio',
      icon: '🎨'
    },
    {
      title: '學習實驗室',
      description: '探索你的學習風格，獲得個人化學習建議',
      href: '/lab',
      icon: '🔬'
    },
    {
      title: 'AI 學習助手',
      description: '智能規劃學習路徑，追蹤學習進度',
      href: '/learning-guide',
      icon: '🤖'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">打造你的專屬</span>
              <span className="block text-indigo-600">學習小島</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              在這裡，你可以規劃學習路徑、分享創意想法、尋找學習夥伴，並展示你的成長歷程。
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              信任來自數據的力量
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              每一天，都有更多學習者在這裡實現自己的目標
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                活躍學習者
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                100,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                學習路徑
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                50+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                成功案例
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                5,000+
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mainFeatures.map((feature) => (
            <Link 
              key={feature.title}
              href={feature.href}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Learning Paths */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              熱門學習路徑
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              精心設計的學習路徑，幫助你循序漸進地達成目標
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {learningPaths.map((path) => (
                <div key={path.title} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-indigo-600 bg-opacity-50"></div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">{path.title}</h3>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">👥 {path.users} 學習者</span>
                        <span className="mx-2">⏱ {path.duration}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        難度：{path.level}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="/learning-plans" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        了解更多 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              學習者故事
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              聽聽他們是如何實現自己的目標
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {successStories.map((story) => (
                <div key={story.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-indigo-100"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">{story.name}</h4>
                        <p className="text-indigo-600">{story.role} @ {story.company}</p>
                      </div>
                    </div>
                    <blockquote className="mt-4 text-gray-500">
                      "{story.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              為什麼選擇學習島？
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              我們提供全方位的學習支持，幫助你實現職涯目標
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {platformFeatures.map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-2xl">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              精選學習資源
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              多元化的學習內容，滿足不同程度的學習需求
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource) => (
                <div key={resource.title} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="text-3xl mb-4">{resource.icon}</div>
                    <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      {resource.category}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {resource.title}
                    </h3>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center">
                        {'★'.repeat(Math.floor(resource.rating))}
                        <span className="ml-2 text-sm text-gray-600">{resource.rating}</span>
                      </div>
                      <div className="ml-4 text-sm text-gray-500">
                        {resource.students} 位學員
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              合作夥伴
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              與頂尖企業和機構合作，為你提供最好的資源
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <div key={partner.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="h-12 flex items-center justify-center bg-indigo-100 rounded-lg mb-4">
                    <span className="text-lg font-semibold text-indigo-600">{partner.name}</span>
                  </div>
                  <div className="text-sm font-medium text-indigo-600 mb-2">
                    {partner.type}
                  </div>
                  <p className="text-gray-500">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Activities */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              即將舉辦的活動
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              參與社群活動，擴展你的學習視野
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
                <div className="text-sm text-indigo-600 font-semibold">3月15日</div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Web3.0 技術分享會</h3>
                <p className="mt-2 text-gray-500">探討最新的區塊鏈技術發展和應用場景</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    線上活動
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
                <div className="text-sm text-indigo-600 font-semibold">3月20日</div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">UI設計工作坊</h3>
                <p className="mt-2 text-gray-500">手把手教你設計出優秀的用戶界面</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    實體活動
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
                <div className="text-sm text-indigo-600 font-semibold">3月25日</div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">程式競賽</h3>
                <p className="mt-2 text-gray-500">挑戰自我，與其他開發者一較高下</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    線上活動
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-16">
                  <div className="lg:w-0 lg:flex-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">
                      訂閱最新資訊
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg text-indigo-100">
                      獲取最新的學習資源、活動通知和專業技術文章，
                      讓你的學習之旅永不止步。
                    </p>
                  </div>
                  <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                    <form className="sm:flex">
                      <label htmlFor="email-address" className="sr-only">
                        電子郵件
                      </label>
                      <input
                        id="email-address"
                        name="email-address"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white rounded-md"
                        placeholder="輸入你的電子郵件"
                      />
                      <button
                        type="submit"
                        className="mt-3 w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      >
                        立即訂閱
                      </button>
                    </form>
                    <p className="mt-3 text-sm text-indigo-100">
                      我們重視你的隱私，你可以隨時取消訂閱。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">準備好開始你的學習之旅了嗎？</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            立即加入我們，探索無限可能
          </p>
          <Link
            href="/dashboard"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            開始探索
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
