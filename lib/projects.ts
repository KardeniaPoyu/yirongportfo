import db from './db';
import type { Project, ProjectMedia, ProjectCode, ProjectDoc } from './types';

export async function getAllProjects(): Promise<Project[]> {
  const projects = db.prepare('SELECT * FROM projects WHERE status = ? ORDER BY created_at DESC').all('published') as Project[];
  
  return projects.map(project => ({
    ...project,
    technologies: project.technologies ? JSON.parse(project.technologies as any) : [],
  }));
}

export async function getProjectById(id: number): Promise<Project | null> {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined;
  
  if (!project) return null;

  const media = db.prepare('SELECT * FROM project_media WHERE project_id = ? ORDER BY order_index').all(id) as ProjectMedia[];
  const code = db.prepare('SELECT * FROM project_code WHERE project_id = ? ORDER BY order_index').all(id) as ProjectCode[];
  const docs = db.prepare('SELECT * FROM project_docs WHERE project_id = ? ORDER BY order_index').all(id) as ProjectDoc[];

  return {
    ...project,
    technologies: project.technologies ? JSON.parse(project.technologies as any) : [],
    media,
    code,
    docs,
  };
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const technologiesJson = Array.isArray(project.technologies) 
    ? JSON.stringify(project.technologies) 
    : project.technologies || '[]';

  const result = db.prepare(`
    INSERT INTO projects (title, description, category, technologies, cover_image, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    project.title,
    project.description || null,
    project.category,
    technologiesJson,
    project.cover_image || null,
    project.status || 'published'
  );

  return result.lastInsertRowid as number;
}

export async function updateProject(id: number, project: Partial<Project>) {
  const technologiesJson = project.technologies 
    ? (Array.isArray(project.technologies) ? JSON.stringify(project.technologies) : project.technologies)
    : undefined;

  const updates: string[] = [];
  const values: any[] = [];

  if (project.title !== undefined) {
    updates.push('title = ?');
    values.push(project.title);
  }
  if (project.description !== undefined) {
    updates.push('description = ?');
    values.push(project.description);
  }
  if (project.category !== undefined) {
    updates.push('category = ?');
    values.push(project.category);
  }
  if (technologiesJson !== undefined) {
    updates.push('technologies = ?');
    values.push(technologiesJson);
  }
  if (project.cover_image !== undefined) {
    updates.push('cover_image = ?');
    values.push(project.cover_image);
  }
  if (project.status !== undefined) {
    updates.push('status = ?');
    values.push(project.status);
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`).run(...values);
}

export async function deleteProject(id: number) {
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
}

// Media operations
export async function addProjectMedia(projectId: number, media: Omit<ProjectMedia, 'id' | 'project_id'>) {
  db.prepare(`
    INSERT INTO project_media (project_id, type, url, thumbnail, order_index)
    VALUES (?, ?, ?, ?, ?)
  `).run(projectId, media.type, media.url, media.thumbnail || null, media.order_index || 0);
}

export async function deleteProjectMedia(id: number) {
  db.prepare('DELETE FROM project_media WHERE id = ?').run(id);
}

// Code operations
export async function addProjectCode(projectId: number, code: Omit<ProjectCode, 'id' | 'project_id'>) {
  db.prepare(`
    INSERT INTO project_code (project_id, filename, language, content, order_index)
    VALUES (?, ?, ?, ?, ?)
  `).run(projectId, code.filename, code.language || null, code.content, code.order_index || 0);
}

export async function deleteProjectCode(id: number) {
  db.prepare('DELETE FROM project_code WHERE id = ?').run(id);
}

// Docs operations
export async function addProjectDoc(projectId: number, doc: Omit<ProjectDoc, 'id' | 'project_id'>) {
  db.prepare(`
    INSERT INTO project_docs (project_id, title, content, doc_type, order_index)
    VALUES (?, ?, ?, ?, ?)
  `).run(projectId, doc.title, doc.content, doc.doc_type || 'markdown', doc.order_index || 0);
}

export async function deleteProjectDoc(id: number) {
  db.prepare('DELETE FROM project_docs WHERE id = ?').run(id);
}

