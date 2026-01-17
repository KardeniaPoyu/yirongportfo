export interface Project {
  id: number;
  title: string;
  description?: string;
  category: 'computer-graphics' | 'fluid-simulation' | 'autonomous-driving' | 'game-dev' | 'ai' | 'other';
  technologies?: string;
  cover_image?: string;
  created_at: string;
  updated_at: string;
  status: 'published' | 'draft';
  media?: ProjectMedia[];
  code?: ProjectCode[];
  docs?: ProjectDoc[];
}

export interface ProjectMedia {
  id: number;
  project_id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  order_index: number;
}

export interface ProjectCode {
  id: number;
  project_id: number;
  filename: string;
  language?: string;
  content: string;
  order_index: number;
}

export interface ProjectDoc {
  id: number;
  project_id: number;
  title: string;
  content: string;
  doc_type: 'markdown' | 'text';
  order_index: number;
}

export const categoryLabels: Record<Project['category'], string> = {
  'computer-graphics': '计算机图形学',
  'fluid-simulation': '流体仿真',
  'autonomous-driving': '自动驾驶',
  'game-dev': '游戏开发',
  'ai': '人工智能',
  'other': '其他',
};

