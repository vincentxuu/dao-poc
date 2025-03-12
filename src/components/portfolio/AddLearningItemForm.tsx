import { useState } from 'react';
import { LearningItem, PrivacyLevel } from '../../types/portfolio';

interface AddLearningItemFormProps {
  onSubmit: (item: Omit<LearningItem, 'id'>) => void;
  onCancel: () => void;
}

export default function AddLearningItemForm({ onSubmit, onCancel }: AddLearningItemFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'course' as LearningItem['type'],
    date: new Date().toISOString().split('T')[0],
    tags: [] as string[],
    skills: [] as string[],
    privacy: 'public' as PrivacyLevel,
    content: {
      text: '',
      media: [] as { type: 'image' | 'video' | 'document' | 'code' | 'presentation'; url: string }[],
    },
    collaborators: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newCollaborator, setNewCollaborator] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'document' | 'code' | 'presentation'>('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag('');
    }
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const addCollaborator = () => {
    if (newCollaborator && !formData.collaborators.includes(newCollaborator)) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator],
      }));
      setNewCollaborator('');
    }
  };

  const addMedia = () => {
    if (mediaUrl) {
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          media: [...prev.content.media, { type: mediaType, url: mediaUrl }],
        },
      }));
      setMediaUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            標題
          </label>
          <input
            type="text"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            類型
          </label>
          <select
            id="type"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as LearningItem['type'] }))}
          >
            <option value="course">課程</option>
            <option value="project">專案</option>
            <option value="note">筆記</option>
            <option value="research">研究</option>
            <option value="internship">實習</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          描述
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            日期
          </label>
          <input
            type="date"
            id="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">
            隱私設定
          </label>
          <select
            id="privacy"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.privacy}
            onChange={(e) => setFormData(prev => ({ ...prev, privacy: e.target.value as PrivacyLevel }))}
          >
            <option value="public">公開</option>
            <option value="private">私密</option>
            <option value="limited">限定分享</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          內容
        </label>
        <textarea
          id="content"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.content.text}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            content: { ...prev.content, text: e.target.value },
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">媒體資源</label>
        <div className="mt-1 flex space-x-2">
          <select
            className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as typeof mediaType)}
          >
            <option value="image">圖片</option>
            <option value="video">影片</option>
            <option value="document">文件</option>
            <option value="code">程式碼</option>
            <option value="presentation">簡報</option>
          </select>
          <input
            type="text"
            placeholder="輸入URL"
            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={addMedia}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.content.media.map((media, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {media.type}: {media.url.substring(0, 20)}...
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    media: prev.content.media.filter((_, i) => i !== index),
                  },
                }))}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">標籤</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="新增標籤"
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    tags: prev.tags.filter((_, i) => i !== index),
                  }))}
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">技能</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="新增技能"
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    skills: prev.skills.filter((_, i) => i !== index),
                  }))}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">協作者</label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              placeholder="新增協作者"
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
            />
            <button
              type="button"
              onClick={addCollaborator}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.collaborators.map((collaborator, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {collaborator}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    collaborators: prev.collaborators.filter((_, i) => i !== index),
                  }))}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          儲存
        </button>
      </div>
    </form>
  );
}
