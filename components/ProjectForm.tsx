'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Code, FileText, Image as ImageIcon, Video } from 'lucide-react';
import type { Project } from '@/lib/types';
import { categoryLabels } from '@/lib/types';

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
}

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: (project?.category || 'computer-graphics') as Project['category'],
    technologies: project?.technologies 
      ? (Array.isArray(project.technologies) ? project.technologies : [])
      : [] as string[],
    cover_image: project?.cover_image || '',
    status: (project?.status || 'published') as 'published' | 'draft',
  });

  const [techInput, setTechInput] = useState('');
  const [media, setMedia] = useState<Array<{ type: 'image' | 'video'; url: string; order_index: number }>>([]);
  const [codeFiles, setCodeFiles] = useState<Array<{ filename: string; language: string; content: string; order_index: number }>>([]);
  const [docs, setDocs] = useState<Array<{ title: string; content: string; doc_type: 'markdown' | 'text'; order_index: number }>>([]);

  useEffect(() => {
    if (project) {
      // 加载项目的媒体、代码和文档
      fetch(`/api/projects/${project.id}`)
        .then(res => res.json())
        .then(data => {
          setMedia((data.media || []).map((m: any) => ({
            type: m.type,
            url: m.url,
            order_index: m.order_index || 0,
          })));
          setCodeFiles((data.code || []).map((c: any) => ({
            filename: c.filename,
            language: c.language || '',
            content: c.content,
            order_index: c.order_index || 0,
          })));
          setDocs((data.docs || []).map((d: any) => ({
            title: d.title,
            content: d.content,
            doc_type: d.doc_type || 'markdown',
            order_index: d.order_index || 0,
          })));
        });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects';
      const method = project ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('操作失败');

      const result = await res.json();
      const projectId = project?.id || result.id;

      // 保存媒体、代码和文档
      if (media.length > 0 || codeFiles.length > 0 || docs.length > 0) {
        await fetch(`/api/projects/${projectId}/resources`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ media, code: codeFiles, docs }),
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    });
  };

  const addMedia = () => {
    setMedia([...media, { type: 'image', url: '', order_index: media.length }]);
  };

  const updateMedia = (index: number, field: string, value: any) => {
    const updated = [...media];
    updated[index] = { ...updated[index], [field]: value };
    setMedia(updated);
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const addCodeFile = () => {
    setCodeFiles([...codeFiles, { filename: '', language: 'javascript', content: '', order_index: codeFiles.length }]);
  };

  const updateCodeFile = (index: number, field: string, value: any) => {
    const updated = [...codeFiles];
    updated[index] = { ...updated[index], [field]: value };
    setCodeFiles(updated);
  };

  const removeCodeFile = (index: number) => {
    setCodeFiles(codeFiles.filter((_, i) => i !== index));
  };

  const addDoc = () => {
    setDocs([...docs, { title: '', content: '', doc_type: 'markdown', order_index: docs.length }]);
  };

  const updateDoc = (index: number, field: string, value: any) => {
    const updated = [...docs];
    updated[index] = { ...updated[index], [field]: value };
    setDocs(updated);
  };

  const removeDoc = (index: number) => {
    setDocs(docs.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-dark-900/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-dark-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">
            {project ? '编辑作品' : '添加作品'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 基本信息 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-dark-900">基本信息</h3>
            
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                标题 *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                描述
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  分类 *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  状态
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="published">已发布</option>
                  <option value="draft">草稿</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                封面图片 URL
              </label>
              <input
                type="url"
                value={formData.cover_image}
                onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                技术栈
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  className="flex-1 px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="输入技术名称后按回车"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="hover:text-primary-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 媒体文件 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-dark-900">媒体文件</h3>
              <button
                type="button"
                onClick={addMedia}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                添加媒体
              </button>
            </div>
            {media.map((item, index) => (
              <div key={index} className="p-4 border border-dark-200 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <select
                    value={item.type}
                    onChange={(e) => updateMedia(index, 'type', e.target.value)}
                    className="px-3 py-1 border border-dark-300 rounded text-sm"
                  >
                    <option value="image">图片</option>
                    <option value="video">视频</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => updateMedia(index, 'url', e.target.value)}
                  placeholder="媒体文件 URL"
                  className="w-full px-3 py-2 border border-dark-300 rounded text-sm"
                />
              </div>
            ))}
          </div>

          {/* 代码文件 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-dark-900">代码文件</h3>
              <button
                type="button"
                onClick={addCodeFile}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                添加代码
              </button>
            </div>
            {codeFiles.map((item, index) => (
              <div key={index} className="p-4 border border-dark-200 rounded-lg space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <input
                    type="text"
                    value={item.filename}
                    onChange={(e) => updateCodeFile(index, 'filename', e.target.value)}
                    placeholder="文件名"
                    className="flex-1 px-3 py-2 border border-dark-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    value={item.language}
                    onChange={(e) => updateCodeFile(index, 'language', e.target.value)}
                    placeholder="语言"
                    className="w-32 px-3 py-2 border border-dark-300 rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeCodeFile(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={item.content}
                  onChange={(e) => updateCodeFile(index, 'content', e.target.value)}
                  placeholder="代码内容"
                  rows={8}
                  className="w-full px-3 py-2 border border-dark-300 rounded text-sm font-mono"
                />
              </div>
            ))}
          </div>

          {/* 文档 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-dark-900">项目文档</h3>
              <button
                type="button"
                onClick={addDoc}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                添加文档
              </button>
            </div>
            {docs.map((item, index) => (
              <div key={index} className="p-4 border border-dark-200 rounded-lg space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateDoc(index, 'title', e.target.value)}
                    placeholder="文档标题"
                    className="flex-1 px-3 py-2 border border-dark-300 rounded text-sm"
                  />
                  <select
                    value={item.doc_type}
                    onChange={(e) => updateDoc(index, 'doc_type', e.target.value)}
                    className="px-3 py-2 border border-dark-300 rounded text-sm"
                  >
                    <option value="markdown">Markdown</option>
                    <option value="text">文本</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeDoc(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={item.content}
                  onChange={(e) => updateDoc(index, 'content', e.target.value)}
                  placeholder="文档内容"
                  rows={6}
                  className="w-full px-3 py-2 border border-dark-300 rounded text-sm"
                />
              </div>
            ))}
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end gap-4 pt-4 border-t border-dark-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-dark-300 rounded-lg hover:bg-dark-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

