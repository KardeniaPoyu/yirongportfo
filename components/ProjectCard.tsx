'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import type { Project } from '@/lib/types';
import { categoryLabels } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryColor = {
    'computer-graphics': 'bg-blue-100 text-blue-700',
    'fluid-simulation': 'bg-purple-100 text-purple-700',
    'autonomous-driving': 'bg-green-100 text-green-700',
    'game-dev': 'bg-orange-100 text-orange-700',
    'ai': 'bg-pink-100 text-pink-700',
    'other': 'bg-gray-100 text-gray-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.id}`}>
        <div className="card-hover bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-br from-primary-400 to-purple-500 overflow-hidden">
            {project.cover_image ? (
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/50" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold text-dark-900 mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-dark-600 mb-4 line-clamp-2 flex-1">
              {project.description || '暂无描述'}
            </p>

            {/* Technologies */}
            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-dark-100 text-dark-700 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-dark-500 text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-200">
              <span className="text-sm text-dark-500">
                {new Date(project.created_at).toLocaleDateString('zh-CN')}
              </span>
              <ArrowRight className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
