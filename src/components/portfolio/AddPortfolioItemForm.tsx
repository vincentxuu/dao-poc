import { useState } from 'react';
import { LearningItem, LearningItemType, PrivacyLevel } from '@/types/portfolio';

interface AddPortfolioItemFormProps {
  onSubmit: (item: Omit<LearningItem, 'id'>) => void;
  onCancel: () => void;
}

const AddPortfolioItemForm = ({ onSubmit, onCancel }: AddPortfolioItemFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'course' | 'project' | 'note' | 'research' | 'internship'>('project');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<PrivacyLevel>('public');
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<LearningItem, 'id'> = {
      title,
      description,
      type,
      date,
      tags,
      skills,
      privacy,
      content: {
        text: content,
        media: mediaUrls.map(url => ({ type: 'image', url }))
      },
      collaborators: [],
      feedback: [],
      achieved: false
    };
    onSubmit(newItem);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('project');
    setDate('');
    setTags([]);
    setSkills([]);
    setPrivacy('public');
    setContent('');
    setMediaUrls([]);
    setTagInput('');
    setSkillInput('');
  };

  const handleTagAdd = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleSkillAdd = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">新增學習項目</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="sr-only">關閉</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">標題</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">類型</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'course' | 'project' | 'note' | 'research' | 'internship')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="project">專案</option>
          <option value="course">課程</option>
          <option value="note">筆記</option>
          <option value="research">研究</option>
          <option value="internship">實習</option>
          <option value="achievement">成就</option>
          <option value="milestone">里程碑</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">標籤</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="block flex-1 rounded-md border border-gray-300 px-3 py-2"
            placeholder="輸入標籤"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            新增
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">技能</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="block flex-1 rounded-md border border-gray-300 px-3 py-2"
            placeholder="輸入技能"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            新增
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">隱私設定</label>
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value as PrivacyLevel)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="public">公開</option>
          <option value="private">私人</option>
          <option value="connections">僅限人脈</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">內容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={5}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">媒體連結</label>
        <div className="flex gap-2 mt-1">
          <input
            type="url"
            value={mediaUrls[mediaUrls.length - 1] || ''}
            onChange={(e) => {
              const newUrls = [...mediaUrls];
              if (newUrls.length === 0) {
                newUrls.push(e.target.value);
              } else {
                newUrls[newUrls.length - 1] = e.target.value;
              }
              setMediaUrls(newUrls);
            }}
            className="block flex-1 rounded-md border border-gray-300 px-3 py-2"
            placeholder="輸入媒體連結"
          />
          <button
            type="button"
            onClick={() => setMediaUrls([...mediaUrls, ''])}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            新增
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {mediaUrls.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 truncate text-sm text-gray-600">{url}</span>
              <button
                type="button"
                onClick={() => setMediaUrls(mediaUrls.filter((_, i) => i !== index))}
                className="text-red-600 hover:text-red-800"
              >
                刪除
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          重置
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          新增作品
        </button>
      </div>
    </form>
  );
};

export default AddPortfolioItemForm;
