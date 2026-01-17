'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Tag, Code, FileText, Image as ImageIcon, Video, Github } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Project } from '@/lib/types';
import { categoryLabels } from '@/lib/types';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'docs' | 'media'>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = project.media?.filter(m => m.type === 'image') || [];
  const videos = project.media?.filter(m => m.type === 'video') || [];

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {project.cover_image ? (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="px-4 py-2 bg-primary-600 rounded-full text-sm font-medium">
                {categoryLabels[project.category]}
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(project.created_at).toLocaleDateString('zh-CN')}
              </span>
            </div>
          </div>
        </div>

        {project.description && (
          <p className="text-xl text-dark-700 leading-relaxed max-w-4xl">
            {project.description}
          </p>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="mb-8 border-b border-dark-200">
        <div className="flex flex-wrap gap-4">
          {['overview', 'media', 'code', 'docs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-primary-600'
                  : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              {tab === 'overview' && '概览'}
              {tab === 'media' && '媒体'}
              {tab === 'code' && '代码'}
              {tab === 'docs' && '文档'}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-primary-600" />
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-primary-600" />
                  项目截图
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.slice(0, 6).map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImage(img.url)}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-dark-100"
                    >
                      <Image
                        src={img.url}
                        alt="项目截图"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {images.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-primary-600" />
                  图片 ({images.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImage(img.url)}
                      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-dark-100 shadow-lg"
                    >
                      <Image
                        src={img.url}
                        alt="项目图片"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Video className="w-6 h-6 text-primary-600" />
                  视频 ({videos.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="relative aspect-video rounded-xl overflow-hidden bg-dark-100 shadow-lg"
                    >
                      <video
                        src={video.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length === 0 && videos.length === 0 && (
              <div className="text-center py-12 text-dark-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-dark-300" />
                <p>暂无媒体文件</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {project.code && project.code.length > 0 ? (
              project.code.map((codeFile) => (
                <div key={codeFile.id} className="bg-dark-800 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-dark-700 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-primary-400" />
                      <span className="text-white font-medium">{codeFile.filename}</span>
                      {codeFile.language && (
                        <span className="px-2 py-1 bg-dark-600 text-dark-300 text-xs rounded">
                          {codeFile.language}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-0">
                    <SyntaxHighlighter
                      language={codeFile.language || 'text'}
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: 0 }}
                      showLineNumbers
                    >
                      {codeFile.content}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-dark-500">
                <Code className="w-16 h-16 mx-auto mb-4 text-dark-300" />
                <p>暂无代码文件</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Docs Tab */}
        {activeTab === 'docs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {project.docs && project.docs.length > 0 ? (
              project.docs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary-600" />
                    {doc.title}
                  </h3>
                  <div className="prose max-w-none text-dark-700 whitespace-pre-wrap">
                    {doc.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-dark-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-dark-300" />
                <p>暂无项目文档</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-dark-900/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={selectedImage}
              alt="查看大图"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}

